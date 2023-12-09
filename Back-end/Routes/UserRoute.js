/**
 * Configuration des routes pour la gestion des utilisateurs.
 * 
 * Ce module configure les routes pour les différentes opérations liées aux utilisateurs.
 * Il inclut des routes pour l'inscription, la connexion, la confirmation de compte, 
 * la gestion des utilisateurs par un administrateur, la récupération et la mise à jour des données utilisateur, 
 * la réinitialisation du mot de passe, et la gestion des jeux favoris.
 * 
 * @module UserRoute
 * @requires express
 * @requires UserController
 * @requires AuthMiddleware
 */
const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const authenticateRole = require('../Middlewares/Auth');
// Route pour l'inscription des utilisateurs
router.post('/signIn', UserController.signIn);

// Route pour la connexion des utilisateurs
router.post('/login', UserController.login);

// Route pour confirmer le compte d'un utilisateur
router.get('/confirmAccount/:token', UserController.confirmAccount);

// Route pour créer un compte utilisateur par un administrateur
router.post('/createUserAdmin', authenticateRole('user'), UserController.createUserAdmin);

// Route pour obtenir les informations d'un utilisateur à partir d'un jeton
router.get('/getUserFromToken', authenticateRole(['user', 'admin']), UserController.getUserFromToken);

// Route pour obtenir tous les utilisateurs (accès réservé aux administrateurs)
router.get('/getAllUsers', authenticateRole('admin'), UserController.getAllUsers);

// Route pour obtenir les informations d'un utilisateur spécifique
router.get('/getUser/:id', UserController.getUser);

// Route pour mettre à jour les informations d'un utilisateur
router.put('/updateUser/:id', authenticateRole(['user', 'admin']), UserController.updateUser);

// Route pour supprimer un utilisateur (accès réservé aux administrateurs)
router.delete('/deleteUser/:id', authenticateRole('admin'), UserController.deleteUser);

// Route pour supprimer le compte d'un utilisateur à partir d'un jeton
router.delete('/deleteUserFromToken', authenticateRole(['user', 'admin']), UserController.deleteUserFromToken);

// Route pour demander la réinitialisation du mot de passe
router.post('/requestPasswordReset', UserController.requestPasswordReset);

// Route pour réinitialiser le mot de passe
router.post('/resetPassword', UserController.resetPassword);

// Route pour obtenir les jeux favoris d'un utilisateur
router.get('/getUserFavorites', authenticateRole(['user', 'admin']), UserController.getUserFavorites);

// Route pour retirer un jeu des favoris
router.delete('/removeGameFromFavorites/:id', authenticateRole(['user', 'admin']), UserController.removeGameFromFavorites);

// Route pour ajouter un jeu aux favoris
router.post('/addToFavorites/:id', authenticateRole(['user', 'admin']), UserController.addToFavorites);

module.exports = router;
