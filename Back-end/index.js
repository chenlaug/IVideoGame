/**
 * Configuration et lancement du serveur Express.
 * 
 * Ce fichier configure et démarre un serveur Express pour une application Web.
 * Il inclut des configurations pour le traitement des requêtes JSON, la gestion des CORS,
 * l'analyse des requêtes entrantes et la mise en place de différentes routes pour l'API.
 * Le serveur sert également des fichiers statiques.
 * 
 * @module index
 * @requires express
 * @requires cors
 * @requires body-parser
 * @requires dotenv
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Connection vers Mongodb
require('./Configs/Db');

// Importation et utilisation des routes
const UserRoute = require('./Routes/UserRoute');
const ContactRoute = require('./Routes/ContactRoute');
const VideoGameRoute = require('./Routes/VideoGameRoute');
const CommentsRoute = require('./Routes/CommentsRoute');
const DeveloppeurRoute = require('./Routes/DeveloppeurRoute');
const EditeurRoute = require('./Routes/EditeurRoute');

// Configuration des routes
app.use('/api/user', UserRoute);
app.use('/api/contact', ContactRoute);
app.use('/api/videoGame', VideoGameRoute);
app.use('/api/comments', CommentsRoute);
app.use('/api/developpeur', DeveloppeurRoute);
app.use('/api/editeur', EditeurRoute);

// Serveur de fichiers statiques pour les uploads et les images PEGI
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/imagePegi', express.static(__dirname + '/resource/ImagePegi'));

// Démarrage du serveur sur le port spécifié
const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
