/**
 * Contrôleur pour gérer les opérations utilisateur.
 * Ce module fournit des fonctions pour s'inscrire, confirmer le compte, se connecter,
 * gérer les utilisateurs, réinitialiser le mot de passe et gérer les jeux favoris.
 *
 * @module UserController
 */

const User = require('../Models/User');
const transporter = require('../Configs/nodemailerConfig');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generatePassword = require('../Utils/GeneratePassword');
const { baseURL } = require('../Configs/Url');

/**
 * Inscrit un nouvel utilisateur et envoie un e-mail de confirmation.
 *
 * @async
 * @function signIn
 * @param {Object} req - La requête HTTP, contenant les informations de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 */

exports.signIn = async (req, res) => {
    try {
        const user = new User(req.body);
        const confirmationToken = crypto.randomBytes(20).toString('hex');
        user.confirmationToken = confirmationToken;
        user.confirmationTokenExpires = Date.now() + 48 * 60 * 60 * 1000; // 48 heure

        await user.save();
        const info = await transporter.sendMail({
            from: '"IVIDEOGAME" <votre_email@gmail.com>',
            to: user.email,
            subject: "Confirmation d'inscription",
            text: `Cliquez sur le lien suivant pour confirmer votre compte : ${baseURL}/confirm-account/${confirmationToken}`,
            html: `<b>Cliquez sur le lien suivant pour confirmer votre compte : <a href="${baseURL}/confirm-account/${confirmationToken}">Confirmer le compte</a></b>`,
        });

        console.log('Message envoyé: %s', info.messageId);
        res.status(200).json({ message: 'Utilisateur enregistré avec succès et email de confirmation envoyé' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Crée un utilisateur admin et envoie un e-mail avec les informations de connexion.
 *
 * @async
 * @function createUserAdmin
 * @param {Object} req - La requête HTTP, contenant les informations de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 */

exports.createUserAdmin = async (req, res) => {
    try {
        const user = new User(req.body);
        const newPassword = generatePassword();
        user.password = newPassword;

        // Définir le champ 'confirmed' sur true
        user.confirmed = true;

        await user.save();

        const info = await transporter.sendMail({
            from: '"IVIDEOGAME" <votre_email@gmail.com>',
            to: user.email,
            subject: "Confirmation d'inscription par un administrateur",
            text: `Bonjour ${user.firstName},\n\nVotre compte a été créé avec succès. Voici vos informations de connexion :\n\nIdentifiant : ${user.email}\nMot de passe : ${newPassword}\n\nNous vous recommandons de changer votre mot de passe après votre première connexion pour des raisons de sécurité.\n\nCordialement,\nL'équipe IVIDEOGAME`,
            html: `<p>Bonjour ${user.firstName},</p><p>Votre compte a été créé avec succès. Voici vos informations de connexion :</p><p>Identifiant : ${user.email}<br>Mot de passe : <b>${newPassword}</b></p><p>Nous vous recommandons de changer votre mot de passe après votre première connexion pour des raisons de sécurité.</p><p>Cordialement,<br>L'équipe IVIDEOGAME</p>`,
        });

        console.log('Message envoyé: %s', info.messageId);
        res.status(200).json({ message: 'Utilisateur enregistré avec succès et email de confirmation envoyé' });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Confirme le compte d'un utilisateur via un jeton.
 *
 * @async
 * @function confirmAccount
 * @param {Object} req - La requête HTTP, contenant le jeton de confirmation.
 * @param {Object} res - La réponse HTTP.
 */

exports.confirmAccount = async (req, res) => {
    try {
        const user = await User.findOne({ confirmationToken: req.params.token });

        if (!user) {
            return res.status(400).json({ message: 'Jeton de confirmation invalide.' });
        }

        if (user.confirmationTokenExpires < Date.now()) {
            // supprimer l'utilisateur si le jeton a expiré
            await User.deleteOne({ _id: user._id });
            return res.status(400).json({ message: 'Le jeton de confirmation a expiré. Veuillez vous réenregistrer.' });
        }

        await User.findOneAndUpdate(
            { confirmationToken: req.params.token },
            {
                $set: {
                    confirmed: true,
                    confirmationToken: undefined,
                    confirmationTokenExpires: undefined,
                },
            },
            { runValidators: false },
        );

        res.status(200).json({ message: 'Compte confirmé avec succès !' });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Changed to error.message pour obtenir le message d'erreur sous forme de chaîne de caractères
    }
};

/**
 * Authentifie un utilisateur et retourne un jeton JWT.
 *
 * @async
 * @function login
 * @param {Object} req - La requête HTTP, contenant l'e-mail et le mot de passe.
 * @param {Object} res - La réponse HTTP.
 */

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne().where('email', email);

        if (!user) {
            return res.status(404).json({ message: "L'adresse n'existe pas." });
        }

        // Vérifie si l'utilisateur a confirmé son compte
        if (!user.confirmed) {
            return res.status(403).json({ message: 'Veuillez confirmer votre compte.' });
        }

        let isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'mot de passe incorrect' });
        }
        const expiresInMn = 3600; // 1 heure
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.PRIVATE_KEY,
            { expiresIn: expiresInMn * 60 }, // 1 heure
        );

        res.status(200).json({ token: token, role: user.role, expiresIn: expiresInMn });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Récupère les informations d'un utilisateur à partir d'un jeton JWT.
 *
 * @async
 * @function getUserFromToken
 * @param {Object} req - La requête HTTP, contenant le jeton JWT.
 * @param {Object} res - La réponse HTTP.
 */

exports.getUserFromToken = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Aucun jeton n'a été fourni." });
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Récupère tous les utilisateurs, avec la possibilité de filtrer par nom de famille.
 *
 * @async
 * @function getAllUsers
 * @param {Object} req - La requête HTTP, contenant un éventuel paramètre de recherche.
 * @param {Object} res - La réponse HTTP.
 */

exports.getAllUsers = async (req, res) => {
    try {
        const lastNameToSearchFor = req.query.lastName;

        let query;
        if (lastNameToSearchFor) {
            // Utiliser une expression régulière pour une recherche insensible à la casse
            // et qui ne nécessite pas le nom complet
            query = { lastName: new RegExp(lastNameToSearchFor, 'i') };
        } else {
            query = {};
        }

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Récupère les informations d'un utilisateur spécifique.
 *
 * @async
 * @function getUser
 * @param {Object} req - La requête HTTP, contenant l'ID de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 */

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Met à jour les informations d'un utilisateur spécifique.
 *
 * @async
 * @function updateUser
 * @param {Object} req - La requête HTTP, contenant l'ID de l'utilisateur et les données mises à jour.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        // Update fields here. req.body should only contain fields that exist in the User model.
        for (let key in req.body) {
            if (key === 'password' && !req.body.password) continue; // If password is null or empty, skip updating it
            user[key] = req.body[key];
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Supprime un utilisateur spécifique.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - La requête HTTP, contenant l'ID de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }
        res.status(200).json({ message: "L'utilisateur n'a pas été trouvé." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Supprime un utilisateur en utilisant le jeton JWT et envoie un e-mail de confirmation.
 *
 * @async
 * @function deleteUserFromToken
 * @param {Object} req - La requête HTTP, contenant le jeton JWT.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteUserFromToken = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Pas de jeton fourni.' });
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        // Now we can send an email to the user
        const info = await transporter.sendMail({
            from: '"IVIDEOGAME" <votre_email@gmail.com>',
            to: user.email,
            subject: 'Compte supprimé',
            text: 'Votre compte a été supprimé avec succès.',
            html: '<b>Votre compte a été supprimé avec succès.</b>',
        });

        console.log('Message envoyé: %s', info.messageId);

        // After sending email we delete the user
        const deletedUser = await User.findByIdAndDelete(decoded.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Échec de la suppression de l'utilisateur" });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Envoie un e-mail pour réinitialiser le mot de passe d'un utilisateur.
 *
 * @async
 * @function requestPasswordReset
 * @param {Object} req - La requête HTTP, contenant l'adresse e-mail de l'utilisateur.
 * @param {Object} res - La réponse HTTP.
 */

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const info = await transporter.sendMail({
            from: '"IVIDEOGAME" <votre_email@gmail.com>',
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${baseURL}/password-reset/${user.confirmationToken}`,
            html: `<b>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${baseURL}/password-reset/${user.confirmationToken}">Réinitialiser le mot de passe</a></b>`,
        });

        console.log('Message envoyé: %s', info.messageId);
        res.status(200).json({
            message: 'Courriel de réinitialisation du mot de passe envoyé.',
            messageId: info.messageId,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Réinitialise le mot de passe d'un utilisateur.
 *
 * @async
 * @function resetPassword
 * @param {Object} req - La requête HTTP, contenant le jeton et le nouveau mot de passe.
 * @param {Object} res - La réponse HTTP.
 */

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ confirmationToken: token });
        if (!user) {
            return res.status(400).json({ message: "Le jeton n'est pas valide ou a expiré." });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Réinitialisation du mot de passe réussie.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Ajoute un jeu aux favoris de l'utilisateur.
 *
 * @async
 * @function addToFavorites
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu.
 * @param {Object} res - La réponse HTTP.
 */

exports.addToFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // vérifie si le jeu est déjà dans la liste des favoris
        if (user.favorisGames.includes(req.params.id)) {
            return res.status(400).json({ message: 'Jeu déjà dans les favoris' });
        }

        user.favorisGames.push(req.params.id);
        await user.save();

        // Charger les documents associés
        await user.populate('favorisGames');

        res.status(200).json({ message: 'Jeu ajouté aux favoris avec succès', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Récupère les jeux favoris d'un utilisateur.
 *
 * @async
 * @function getUserFavorites
 * @param {Object} req - La requête HTTP, contenant les paramètres de recherche éventuels.
 * @param {Object} res - La réponse HTTP.
 */

exports.getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorisGames');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        let favorisGames = user.favorisGames;

        // Si un paramètre de requête "titre" a été fourni, filtrez les jeux favoris par ce titre
        if (req.query.titre) {
            const rechercheQuery = new RegExp(req.query.titre, 'i'); // 'i' rend la recherche insensible à la casse
            favorisGames = favorisGames.filter((game) => rechercheQuery.test(game.titre));
        }

        res.status(200).json({ favorisGames: favorisGames });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Supprime un jeu des favoris de l'utilisateur.
 *
 * @async
 * @function removeGameFromFavorites
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu à supprimer.
 * @param {Object} res - La réponse HTTP.
 */

exports.removeGameFromFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Convert the array of ObjectId to string array
        const favorisGames = user.favorisGames.map((game) => game.toString());

        const gameIndex = favorisGames.indexOf(req.params.id);

        if (gameIndex !== -1) {
            user.favorisGames.splice(gameIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Jeu supprimé des favoris' });
        } else {
            return res.status(404).json({ message: 'Jeu non trouvé dans les favoris' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
