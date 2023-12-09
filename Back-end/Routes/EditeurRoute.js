/**
 * @module EditeurRoute
 * @description Gestion des routes pour les éditeurs de jeux vidéo.
 */
const express = require('express');
const router = express.Router();

const EditeurController = require('../Controllers/EditeurController');
const authenticateRole = require('../Middlewares/Auth');

/**
 * @route POST /createEditeur
 * @description Crée un nouvel éditeur.
 * @access Admin
 * @body {String} nom - Nom de l'éditeur.
 * @body {String} pays - Pays d'origine de l'éditeur.
 * @body {String} [siteWeb] - Site Web de l'éditeur.
 */
router.post('/createEditeur', authenticateRole('admin'), EditeurController.createEditeur);

/**
 * @route GET /getEditeurs
 * @description Récupère tous les éditeurs.
 * @access Admin
 * @returns {Array} Liste des éditeurs.
 */
router.get('/getEditeurs', authenticateRole('admin'), EditeurController.getEditeurs);

/**
 * @route GET /getEditeurById/:id
 * @description Récupère un éditeur par son identifiant.
 * @access Admin
 * @param {String} id - Identifiant de l'éditeur.
 * @returns {Object} Éditeur correspondant à l'identifiant.
 */
router.get('/getEditeurById/:id', authenticateRole('admin'), EditeurController.getEditeurById);

/**
 * @route PUT /updateEditeur/:id
 * @description Met à jour un éditeur spécifique.
 * @access Admin
 * @param {String} id - Identifiant de l'éditeur à mettre à jour.
 * @body {String} [nom] - Nouveau nom de l'éditeur.
 * @body {String} [pays] - Nouveau pays de l'éditeur.
 * @body {String} [siteWeb] - Nouveau site Web de l'éditeur.
 */
router.put('/updateEditeur/:id', authenticateRole('admin'), EditeurController.updateEditeur);

/**
 * @route DELETE /deleteEditeur/:id
 * @description Supprime un éditeur spécifique.
 * @access Admin
 * @param {String} id - Identifiant de l'éditeur à supprimer.
 * @returns {Object} Message de succès.
 */
router.delete('/deleteEditeur/:id', authenticateRole('admin'), EditeurController.deleteEditeur);

module.exports = router;
