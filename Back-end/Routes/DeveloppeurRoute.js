/**
 * Routes pour la gestion des développeurs.
 *
 * Ce module définit les routes pour les opérations liées aux développeurs de jeux vidéo,
 * permettant la création, la lecture, la mise à jour et la suppression d'informations sur les développeurs.
 * L'accès à ces routes est restreint aux utilisateurs ayant un rôle d'administrateur grâce à l'utilisation
 * du middleware 'authenticateRole'.
 *
 * @module DeveloppeurRoute
 * @requires express
 * @requires DeveloppeurController
 * @requires AuthMiddleware
 */
const express = require('express');
const router = express.Router();

const DeveloppeurController = require('../Controllers/DeveloppeurController');
const authenticateRole = require('../Middlewares/Auth');

// Route pour créer un nouveau développeur (uniquement pour les administrateurs)
router.post('/createDeveloppeur', authenticateRole('admin'), DeveloppeurController.createDeveloppeur);

// Route pour obtenir la liste de tous les développeurs (uniquement pour les administrateurs)
router.get('/getDeveloppeurs', authenticateRole('admin'), DeveloppeurController.getDeveloppeurs);

// Route pour obtenir les détails d'un développeur spécifique par son ID (uniquement pour les administrateurs)
router.get('/getDeveloppeurById/:id', authenticateRole('admin'), DeveloppeurController.getDeveloppeurById);

// Route pour mettre à jour les informations d'un développeur spécifique (uniquement pour les administrateurs)
router.put('/updateDeveloppeur/:id', authenticateRole('admin'), DeveloppeurController.updateDeveloppeur);

// Route pour supprimer un développeur spécifique (uniquement pour les administrateurs)
router.delete('/deleteDeveloppeur/:id', authenticateRole('admin'), DeveloppeurController.deleteDeveloppeur);

module.exports = router;
