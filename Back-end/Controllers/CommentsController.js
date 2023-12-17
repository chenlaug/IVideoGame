/**
 * Contrôleur pour gérer les opérations liées aux commentaires dans l'application.
 * Ce module exporte des fonctions pour ajouter, obtenir, supprimer et mettre à jour des commentaires.
 *
 * @module CommentsController
 */

const Comments = require('../Models/Comments');
const User = require('../Models/User');

/**
 * Ajoute un commentaire à un jeu vidéo.
 * Cette fonction vérifie d'abord si l'utilisateur existe, puis vérifie si l'utilisateur a déjà commenté le jeu spécifié.
 * Si non, elle crée un nouveau commentaire et l'ajoute à la fois à la collection des commentaires et à la liste des commentaires de l'utilisateur.
 *
 * @async
 * @function addComments
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.addComments = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const gameId = req.params.id;
        const existingComment = user.comments.find(
            (comment) => comment.VideoGame && comment.VideoGame.toString() === gameId,
        );
        console.log('Existing Comment:', existingComment);

        if (existingComment) {
            return res.status(400).json({ message: 'User already commented on this game' });
        }

        // Assurez-vous que req.body contient les propriétés nécessaires pour créer un commentaire
        const commentData = {
            ...req.body,
            VideoGame: gameId,
        };

        const comment = new Comments(commentData);
        user.comments.push(comment);

        await user.save();

        const result = await comment.save();

        res.status(200).send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }
};

/**
 * Récupère tous les commentaires d'un utilisateur spécifique.
 * Cette fonction filtre les commentaires basés sur le titre du jeu, si fourni dans la requête.
 *
 * @async
 * @function getAllUserComments
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.getAllUserComments = async (req, res) => {
    try {
        const { title } = req.query;
        const user = await User.findById(req.user.id).populate({
            path: 'comments',
            populate: {
                path: 'VideoGame',
                match: title ? { title: { $regex: new RegExp(title, 'i') } } : {},
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Filtrer les commentaires pour exclure ceux sans jeux correspondants
        const comments = user.comments.filter((comment) => comment.VideoGame !== null);

        res.send(comments);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Supprime un commentaire spécifié par son ID.
 * Cette fonction vérifie d'abord si le commentaire et l'utilisateur existent, puis si l'utilisateur est autorisé à supprimer le commentaire.
 *
 * @async
 * @function deleteComments
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteComments = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifiez que l'utilisateur est l'auteur du commentaire ou un administrateur
        const isAuthor = user.comments.some((userComment) => userComment._id.toString() === req.params.id);

        if (!isAuthor && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer ce commentaire." });
        }

        await Comments.deleteOne({ _id: req.params.id });

        // Supprimer également la référence au commentaire dans le document de l'utilisateur
        user.comments = user.comments.filter((userComment) => userComment._id.toString() !== req.params.id);
        await user.save();

        return res.status(200).json({ message: 'Commentaire supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Met à jour un commentaire spécifié par son ID.
 * Cette fonction vérifie si le commentaire et l'utilisateur existent et si l'utilisateur est autorisé à mettre à jour le commentaire.
 *
 * @async
 * @function updateComment
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifiez que l'utilisateur est l'auteur du commentaire
        const isAuthor = user.comments.some((userComment) => userComment._id.toString() === req.params.id);

        if (!isAuthor) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier ce commentaire." });
        }

        const updatedComment = await Comments.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }, // Cette option fait en sorte que la méthode renvoie le document mis à jour
        );

        return res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Récupère tous les commentaires pour un jeu vidéo spécifique.
 * Cette fonction recherche les commentaires basés sur l'ID du jeu vidéo.
 *
 * @async
 * @function getGameComments
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.getGameComments = async (req, res) => {
    try {
        const gameId = req.params.id;
        const comments = await Comments.find({ VideoGame: gameId });

        return res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Récupère les commentaires basés sur le titre du jeu.
 * Cette fonction permet d'obtenir les commentaires de tous les utilisateurs pour un jeu spécifique.
 *
 * @async
 * @function getComments
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.getComments = async (req, res) => {
    try {
        const gameTitleToSearchFor = req.query.title; // Obtenir le titre du jeu à partir des paramètres de la requête
        const users = await User.find().populate({
            path: 'comments',
            populate: {
                path: 'VideoGame',
                match: gameTitleToSearchFor ? { title: gameTitleToSearchFor } : undefined, // Ne remplir les jeux qu'avec le titre spécifié s'il n'est pas vide
            },
        });
        const comments = users.flatMap((user) =>
            user.comments.map((comment) => ({
                ...comment._doc,
                VideoGame: comment.VideoGame,
                author: `${user.firstName} ${user.lastName}`,
            })),
        );
        // Filtrer les commentaires où le jeu ne correspond pas uniquement si un titre est spécifié
        const filteredComments = gameTitleToSearchFor ? comments.filter((comment) => comment.VideoGame) : comments;
        res.json(filteredComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
