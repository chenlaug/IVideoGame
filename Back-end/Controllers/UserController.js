const User = require('../Models/User');
const transporter = require('../Configs/nodemailerConfig');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generatePassword = require('../Utils/GeneratePassword');
const { baseURL } = require('../Configs/Url');

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


exports.confirmAccount = async (req, res) => {
    try {
        const user = await User.findOne({ confirmationToken: req.params.token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid confirmation token.' });
        }

        if (user.confirmationTokenExpires < Date.now()) {
            // delete user if the token has expired
            await User.deleteOne({ _id: user._id });
            return res.status(400).json({ message: 'Confirmation token expired. Please register again.' });
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

        res.status(200).json({ message: 'Account confirmed successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Changed to error.message to get the string error message
    }
};

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

exports.getUserFromToken = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const lastNameToSearchFor = req.query.lastName;
        const users = lastNameToSearchFor ? await User.find({ lastName: lastNameToSearchFor }) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUserFromToken = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
            return res.status(404).json({ message: 'User deletion failed' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        res.status(200).json({ message: 'Reset password email sent.', messageId: info.messageId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ confirmationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired.' });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        res.status(500).json("c'est pas bon", { message: error.message });
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // vérifie si le jeu est déjà dans la liste des favoris
        if (user.favorisGames.includes(req.params.id)) {
            return res.status(400).json({ message: 'Game already in favorites' });
        }

        user.favorisGames.push(req.params.id);
        await user.save();

        // Charger les documents associés
        await user.populate('favorisGames');

        res.status(200).json({ message: 'Game added to favorites successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorisGames');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

exports.removeGameFromFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert the array of ObjectId to string array
        const favorisGames = user.favorisGames.map((game) => game.toString());

        const gameIndex = favorisGames.indexOf(req.params.id);

        if (gameIndex !== -1) {
            user.favorisGames.splice(gameIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Game removed from favorites' });
        } else {
            return res.status(404).json({ message: 'Game not found in favorites' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
