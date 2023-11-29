const Developpeur = require('../Models/Developpeur');

// Créer un nouveau développeur
exports.createDeveloppeur = async (req, res) => {
    try {
        const developpeur = await Developpeur.create(req.body);
        res.status(201).json(developpeur);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Lire tous les développeurs
exports.getDeveloppeurs = async (req, res) => {
    try {
        const developpeurs = await Developpeur.find();
        res.status(200).json(developpeurs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Lire un développeur spécifique
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

// Mettre à jour un développeur
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

// Supprimer un développeur
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
