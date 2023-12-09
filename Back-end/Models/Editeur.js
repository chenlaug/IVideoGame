/**
 * Modèle Mongoose pour les éditeurs de jeux vidéo.
 * Utilise le schéma EditeurSchema pour définir la structure des données des éditeurs.
 *
 * @module Editeur
 * @requires mongoose
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma pour les éditeurs de jeux vidéo.
 * Définit les champs et les validations pour les éditeurs.
 */
const EditeurSchema = new Schema(
    {
        nom: { type: String, required: true },
        pays: { type: String, required: true },
        siteWeb: { type: String },
    },
    { timestamps: true },
);

/**
 * Modèle Editeur basé sur EditeurSchema.
 *
 * @type {mongoose.Model}
 */
const Editeur = mongoose.model('Editeur', EditeurSchema);

module.exports = Editeur;
