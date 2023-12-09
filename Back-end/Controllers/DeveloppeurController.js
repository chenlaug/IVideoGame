/**
 * Contrôleur pour gérer les opérations CRUD sur les développeurs de jeux.
 * Ce module permet de créer, lire, mettre à jour et supprimer des informations de développeurs dans la base de données.
 *
 * @module DeveloppeurController
 */

const Developpeur = require('../Models/Developpeur');

/**
 * Crée un nouveau développeur.
 *
 * @async
 * @function createDeveloppeur
 * @param {Object} req - La requête HTTP, contenant les informations du développeur dans le corps.
 * @param {Object} res - La réponse HTTP.
 */

exports.createDeveloppeur = async (req, res) => {
    try {
        const developpeur = await Developpeur.create(req.body);
        res.status(201).json(developpeur);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Récupère tous les développeurs.
 *
 * @async
 * @function getDeveloppeurs
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.getDeveloppeurs = async (req, res) => {
    try {
        const developpeurs = await Developpeur.find();
        res.status(200).json(developpeurs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Récupère un développeur spécifique par son ID.
 *
 * @async
 * @function getDeveloppeurById
 * @param {Object} req - La requête HTTP, contenant l'ID du développeur.
 * @param {Object} res - La réponse HTTP.
 */

exports.getDeveloppeurById = async (req, res) => {
    try {
        const developpeur = await Developpeur.findById(req.params.id);
        if (developpeur) {
            res.status(200).json(developpeur);
        } else {
            res.status(404).json({ message: 'Développeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Met à jour les informations d'un développeur spécifique.
 *
 * @async
 * @function updateDeveloppeur
 * @param {Object} req - La requête HTTP, contenant l'ID du développeur et les nouvelles données.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateDeveloppeur = async (req, res) => {
    try {
        const developpeur = await Developpeur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (developpeur) {
            res.status(200).json(developpeur);
        } else {
            res.status(404).json({ message: 'Développeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Supprime un développeur spécifique de la base de données.
 *
 * @async
 * @function deleteDeveloppeur
 * @param {Object} req - La requête HTTP, contenant l'ID du développeur à supprimer.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteDeveloppeur = async (req, res) => {
    try {
        const developpeur = await Developpeur.findByIdAndDelete(req.params.id);
        if (developpeur) {
            res.status(200).json({ message: 'Développeur supprimé' });
        } else {
            res.status(404).json({ message: 'Développeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
