/**
 * Modèle Mongoose pour les jeux vidéo.
 * Utilise le schéma VideoGameSchema pour définir la structure des données des jeux vidéo.
 * 
 * @module VideoGame
 * @requires mongoose
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma pour les jeux vidéo.
 * Définit les champs et les validations pour les jeux vidéo.
 */
const VideoGameSchema = new Schema(
    {
        titre: { type: String, required: true },
        plateformes: {
            type: [String],
            required: true,
            enum: [
                'PC',
                'PlayStation 5',
                'PlayStation 4',
                'Xbox Series X|S',
                'Xbox One',
                'Nintendo Switch',
                'Google Stadia',
                'Mobile',
                'Steam Deck',
                'PlayStation 3',
                'Xbox 360',
                'Wii U',
                'Wii',
                'Nintendo DS',
                'Nintendo 3DS',
                'PlayStation Vita',
                'PSP',
                'PlayStation 2',
                'PlayStation',
                'Xbox',
                'GameCube',
                'Dreamcast',
                'Nintendo 64',
                'Multi Plateform',
            ],
        },
        description: { type: String, required: true },
        dateSortie: { type: Date, required: true },
        developpeur: { type: Schema.Types.ObjectId, ref: 'Developpeur', required: true },
        editeur: { type: Schema.Types.ObjectId, ref: 'Editeur', required: true },
        typeDeJeu: {
            type: String,
            required: true,
            enum: [
                'Action',
                'Aventure',
                'Action-Aventure',
                'Stratégie',
                'Réflexion',
                'RPG',
                'Sport',
                'Course',
                'Simulation',
                'Plateforme',
                'FPS',
                'TPS',
                'Horreur',
                'Puzzle',
                'Fighting',
                'Battle Royale',
                'Musique',
                'MOBA',
                'MMORPG',
                'Stealth',
                'Survie',
                'Tower Defense',
                'Roguelike',
                'Roguelite',
                'Metroidvania',
                'Visual Novel',
                'Point-and-Click',
                'Beat-Em-Up',
                'Hack and Slash',
                'Party Game',
                'Idle Game',
                'Clicker',
                'City Building',
                'Management',
                'Card Game',
                'Board Game',
                'Trivia',
                'Educational',
            ],
        },
        note: { type: Number, min: 0, max: 5, required: true },
        image: { type: String, required: true },
        siteOfficial: { type: String },
        linkTrailer: { type: String, required: true, unique: true, trim: true },
        modeMultijoueur: { type: Boolean, default: false, required: true },
        pegiImage: { type: String, required: true },
    },
    { timestamps: true },
);

/**
 * Modèle VideoGame basé sur VideoGameSchema.
 * 
 * @type {mongoose.Model}
 */
const VideoGame = mongoose.model('VideoGame', VideoGameSchema);

module.exports = VideoGame;
