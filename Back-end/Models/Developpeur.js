/**
 * Modèle Mongoose pour les développeurs de jeux vidéo.
 * Utilise le schéma DeveloppeurSchema pour définir la structure des données des développeurs.
 *
 * @module Developpeur
 * @requires mongoose
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma pour les développeurs de jeux vidéo.
 * Définit les champs et les validations pour les développeurs.
 */
const DeveloppeurSchema = new Schema(
    {
        nom: { type: String, required: true },
        pays: { type: String, required: true },
        siteWeb: { type: String },
    },
    { timestamps: true },
);

/**
 * Modèle Developpeur basé sur DeveloppeurSchema.
 *
 * @type {mongoose.Model}
 */
const Developpeur = mongoose.model('Developpeur', DeveloppeurSchema);

module.exports = Developpeur;
