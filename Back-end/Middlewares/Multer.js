const multer = require('multer');
const fs = require('fs');

const dirPath = './uploads';

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirPath); // Utiliser le répertoire de destination défini
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Définir le nom du fichier
    },
});

const fileFilter = (req, file, cb) => {
    // Accepter uniquement les fichiers d'image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limite de taille de fichier à 5 MB
    },
    fileFilter,
});

module.exports = upload.single('image'); // Accepter un seul fichier nommé 'image'
