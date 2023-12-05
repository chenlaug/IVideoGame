const Comments = require('../Models/Comments');
const User = require('../Models/User');

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

exports.getGameComments = async (req, res) => {
    try {
        const gameId = req.params.id;
        const comments = await Comments.find({ VideoGame: gameId });

        if (comments.length === 0) {
            return res.status(404).json({ message: 'Commentaires non trouvés pour le jeu spécifié' });
        }

        return res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

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
