/**
 * Modèle Mongoose pour les commentaires sur les jeux vidéo.
 * Utilise le schéma CommentsSchema pour définir la structure des données des commentaires.
 *
 * @module Comments
 * @requires mongoose
 */ const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma pour les commentaires sur les jeux vidéo.
 * Définit les champs et les validations pour les commentaires.
 */
const CommentsSchema = new Schema(
    {
        contenu: { type: String, required: true },
        note: { type: String, required: true, max: 10, min: 0 },
        VideoGame: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'VideoGame',
        },
    },
    { timestamps: true },
);

/**
 * Modèle Comments basé sur CommentsSchema.
 *
 * @type {mongoose.Model}
 */
const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
