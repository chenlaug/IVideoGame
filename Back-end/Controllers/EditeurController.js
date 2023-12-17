/**
 * Contrôleur pour gérer les opérations CRUD sur les éditeurs de jeux.
 * Ce module permet de créer, lire, mettre à jour et supprimer des informations d'éditeurs dans la base de données.
 *
 * @module EditeurController
 */
const Editeur = require('../Models/Editeur');

/**
 * Crée un nouvel éditeur.
 *
 * @async
 * @function createEditeur
 * @param {Object} req - La requête HTTP, contenant les informations de l'éditeur dans le corps.
 * @param {Object} res - La réponse HTTP.
 */

exports.createEditeur = async (req, res) => {
    try {
        const editeur = await Editeur.create(req.body);
        res.status(201).json(editeur);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Récupère tous les éditeurs.
 *
 * @async
 * @function getEditeurs
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */

exports.getEditeurs = async (req, res) => {
    try {
        let query = {};
        if (req.query.nom) {
            // Use a regular expression for case-insensitive search
            query.nom = new RegExp(req.query.nom, 'i'); // 'i' flag for case-insensitive
        }

        const editeurs = await Editeur.find(query);
        res.status(200).json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Récupère un éditeur spécifique par son ID.
 *
 * @async
 * @function getEditeurById
 * @param {Object} req - La requête HTTP, contenant l'ID de l'éditeur.
 * @param {Object} res - La réponse HTTP.
 */

exports.getEditeurById = async (req, res) => {
    try {
        const editeur = await Editeur.findById(req.params.id);
        if (editeur) {
            res.status(200).json(editeur);
        } else {
            res.status(404).json({ message: 'Editeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Met à jour les informations d'un éditeur spécifique.
 *
 * @async
 * @function updateEditeur
 * @param {Object} req - La requête HTTP, contenant l'ID de l'éditeur et les nouvelles données.
 * @param {Object} res - La réponse HTTP.
 */

exports.updateEditeur = async (req, res) => {
    try {
        const editeur = await Editeur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (editeur) {
            res.status(200).json(editeur);
        } else {
            res.status(404).json({ message: 'Editeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Supprime un éditeur spécifique de la base de données.
 *
 * @async
 * @function deleteEditeur
 * @param {Object} req - La requête HTTP, contenant l'ID de l'éditeur à supprimer.
 * @param {Object} res - La réponse HTTP.
 */

exports.deleteEditeur = async (req, res) => {
    try {
        const editeur = await Editeur.findByIdAndDelete(req.params.id);
        if (editeur) {
            res.status(200).json({ message: 'Editeur supprimé' });
        } else {
            res.status(404).json({ message: 'Editeur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
