/**
 * Routes pour la gestion des messages de contact.
 *
 * Ce module définit les routes pour envoyer des messages via le formulaire de contact.
 * La route permet à un utilisateur ou un administrateur authentifié d'envoyer un message.
 * L'authentification et l'autorisation sont gérées par le middleware 'authenticateRole'.
 *
 * @module ContactRoute
 * @requires express
 * @requires ContactController
 * @requires AuthMiddleware
 */

const express = require('express');
const router = express.Router();

const ContactController = require('../Controllers/ContactController');
const authenticateRole = require('../Middlewares/Auth');

/**
 * 
 * Utilise le middleware 'authenticateRole' pour s'assurer que seuls les utilisateurs
 * @description Route pour envoyer un message de contact.
 * @route POST /sendMessage
 * @access Admin, user
 */
router.post('/sendMessage', authenticateRole(['user', 'admin']), ContactController.sendMessage);

module.exports = router;
