/**
 * Routeur Express pour les opérations CRUD sur les jeux vidéo.
 * Utilise VideoGameController pour gérer les requêtes.
 *
 * @module VideoGameRouter
 * @requires express
 * @requires VideoGameController
 * @requires multer
 * @requires authenticateRole
 */
const express = require('express');
const router = express.Router();

const VideoGameController = require('../Controllers/VideoGameController');
const multer = require('../Middlewares/Multer');
const authenticateRole = require('../Middlewares/Auth');

/**
 * Route pour créer un nouveau jeu vidéo.
 * Accessible uniquement aux utilisateurs authentifiés.
 */
router.post('/createGame', authenticateRole('admin'), multer, VideoGameController.createGame);

/**
 * Route pour obtenir tous les jeux vidéo.
 * Accessible aux utilisateurs authentifiés et aux administrateurs.
 */
router.get('/getAllGames', authenticateRole(['user', 'admin']), VideoGameController.getAllGames);

/**
 * Route pour obtenir un jeu vidéo spécifique par son ID.
 * Accessible aux utilisateurs authentifiés et aux administrateurs.
 */
router.get('/getGame/:id', authenticateRole(['user', 'admin']), VideoGameController.getGame);

/**
 * Route pour mettre à jour un jeu vidéo par son ID.
 * Accessible uniquement aux utilisateurs authentifiés.
 */
router.put('/updateGame/:id', authenticateRole('admin'), VideoGameController.updateGame);

/**
 * Route pour mettre à jour l'image d'un jeu vidéo par son ID.
 * Accessible uniquement aux utilisateurs authentifiés.
 */
router.put('/updateImageGame/:id', authenticateRole('admin'), multer, VideoGameController.updateImageGame);

/**
 * Route pour supprimer un jeu vidéo par son ID.
 * Accessible uniquement aux utilisateurs authentifiés.
 */
router.delete('/deleteGame/:id', authenticateRole('admin'), VideoGameController.deleteGame);

module.exports = router;
