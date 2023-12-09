/**
 * Module de configuration de la connexion à la base de données MongoDB.
 * 
 * Ce module utilise Mongoose pour se connecter à une base de données MongoDB. La chaîne de connexion
 * est récupérée à partir de la variable d'environnement `MONGO_URI`. Les options `useNewUrlParser`
 * et `useUnifiedTopology` sont utilisées pour une meilleure compatibilité avec les fonctionnalités
 * de MongoDB et pour éviter les avertissements de dépréciation.
 * 
 * @module databaseConnection
 * 
 * @requires mongoose - Le package Mongoose pour travailler avec MongoDB.
 * 
 * @example
 * // Pour lancer la connexion à la base de données, il suffit d'importer ce module.
 * require('./path/to/this/file');
 * 
 * @environment {string} MONGO_URI - Chaîne de connexion à la base de données MongoDB.
 */

const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connexion établie'))
    .catch((err) => console.log(err));
