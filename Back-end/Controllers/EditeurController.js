const Editeur = require('../Models/Editeur');

// Créer un nouvel éditeur
exports.createEditeur = async (req, res) => {
    try {
        const editeur = await Editeur.create(req.body);
        res.status(201).json(editeur);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Lire tous les éditeurs
exports.getEditeurs = async (req, res) => {
    try {
        const editeurs = await Editeur.find();
        res.status(200).json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Lire un éditeur spécifique
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

// Mettre à jour un éditeur
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

// Supprimer un éditeur
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
