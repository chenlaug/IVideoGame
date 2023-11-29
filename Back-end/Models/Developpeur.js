const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloppeurSchema = new Schema(
    {
        nom: { type: String, required: true },
        pays: { type: String, required: true },
        siteWeb: { type: String },
    },
    { timestamps: true },
);

const Developpeur = mongoose.model('Developpeur', DeveloppeurSchema);

module.exports = Developpeur;
