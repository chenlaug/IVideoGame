const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditeurSchema = new Schema(
    {
        nom: { type: String, required: true },
        pays: { type: String, required: true },
        siteWeb: { type: String },
    },
    { timestamps: true },
);

const Editeur = mongoose.model('Editeur', EditeurSchema);

module.exports = Editeur;
