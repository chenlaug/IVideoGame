/**
 * Configuration Multer pour gérer l'upload de fichiers.
 * Ce module configure Multer pour stocker les fichiers images dans le répertoire 'uploads'.
 * Il inclut également un filtre pour accepter uniquement les fichiers d'image et une limite de taille de fichier.
 *
 * @module multerConfig
 * @requires multer
 * @requires fs
 */

const multer = require('multer');
const fs = require('fs');

/**
 * Chemin du répertoire de stockage des fichiers uploadés.
 * @type {string}
 */
const dirPath = './uploads';

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Configuration de stockage pour Multer.
 * Définit le répertoire de destination et le nom de fichier pour les fichiers uploadés.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirPath); // Utiliser le répertoire de destination défini
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Définir le nom du fichier
    },
});

/**
 * Filtre de fichier pour Multer.
 * Accepte uniquement les fichiers d'image.
 *
 * @param {Object} req - La requête HTTP.
 * @param {Object} file - Le fichier à uploader.
 * @param {Function} cb - Fonction de callback pour signaler si le fichier est accepté.
 */
const fileFilter = (req, file, cb) => {
    // Accepter uniquement les fichiers d'image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/**
 * Instance de Multer configurée pour le stockage, la taille limite et le filtre de fichier.
 *
 * @type {multer}
 */
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limite de taille de fichier à 5 MB
    },
    fileFilter,
});

module.exports = upload.single('image'); // Accepter un seul fichier nommé 'image'
