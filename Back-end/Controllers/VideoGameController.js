/**
 * Contrôleur pour gérer les opérations CRUD sur les jeux vidéo.
 * Ce module permet de créer, lire, mettre à jour, supprimer et gérer les images des jeux vidéo.
 *
 * @module GameController
 */

const VideoGame = require('../Models/VideoGame');
const fs = require('fs');
const path = require('path');

/**
 * Crée un nouveau jeu vidéo.
 *
 * @async
 * @function createGame
 * @param {Object} req - La requête HTTP, contenant les informations du jeu et l'image dans le corps.
 * @param {Object} res - La réponse HTTP.
 */

exports.createGame = async (req, res) => {
    try {
        req.body.image = `uploads/${req.file.filename}`;

        const videoGame = await VideoGame.create(req.body);
        res.status(201).json(videoGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Récupère tous les jeux vidéo. Supporte la recherche par titre.
 *
 * @async
 * @function getAllGames
 * @param {Object} req - La requête HTTP, contenant une requête de recherche éventuelle.
 * @param {Object} res - La réponse HTTP.
 */

exports.getAllGames = async (req, res) => {
    try {
        let { search } = req.query;
        let videoGames;
        if (search) {
            search = new RegExp(search, 'i');
            videoGames = await VideoGame.find({ titre: search });
        } else {
            videoGames = await VideoGame.find();
        }

        res.status(200).json(videoGames);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Récupère un jeu vidéo spécifique par son ID.
 *
 * @async
 * @function getGame
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu.
 * @param {Object} res - La réponse HTTP.
 */

exports.getGame = async (req, res) => {
    const idGame = req.params.id;
    try {
        const game = await VideoGame.findById(idGame)
            .populate('developpeur') // Remplace les ObjectIDs des développeurs par les objets Developpeur correspondants.
            .populate('editeur'); // Remplace les ObjectIDs des éditeurs par les objets Editeur correspondants.

        if (!game) {
            return res.status(404).json({ message: 'Aucun jeu trouvé' });
        }

        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Supprime un jeu vidéo spécifique, ainsi que son image associée.
 *
 * @async
 * @function deleteGame
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu à supprimer.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteGame = async (req, res) => {
    const idGame = req.params.id;
    console.log(idGame);
    try {
        const game = await VideoGame.findByIdAndDelete(idGame);
        if (!game) {
            return res.status(404).json({ message: 'Aucun jeu trouvé' });
        }

        // Suppression de l'image du jeu
        if (game.image) {
            const imagePath = path.join(__dirname, '..', game.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

/**
 * Met à jour les informations d'un jeu vidéo spécifique.
 *
 * @async
 * @function updateGame
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu et les nouvelles données.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateGame = async (req, res) => {
    const idGame = req.params.id;
    try {
        const game = await VideoGame.findByIdAndUpdate(idGame, req.body, {
            new: true,
            runValidators: true,
        });
        if (!game) {
            return res.status(404).json({ message: 'Aucun jeu trouvé' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Met à jour l'image d'un jeu vidéo spécifique.
 *
 * @async
 * @function updateImageGame
 * @param {Object} req - La requête HTTP, contenant l'ID du jeu et la nouvelle image.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateImageGame = async (req, res) => {
    const idGame = req.params.id;
    try {
        const game = await VideoGame.findById(idGame);
        if (!game) {
            return res.status(404).json({ message: 'Aucun jeu trouvé' });
        }

        if (req.file) {
            // Suppression de l'ancienne image
            if (game.image) {
                const oldImagePath = path.join(__dirname, '..', game.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Ajout de la nouvelle image
            game.image = `uploads/${req.file.filename}`;
        }

        await game.save();
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
