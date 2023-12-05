const express = require('express');
const router = express.Router();

const EditeurController = require('../Controllers/EditeurController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/createEditeur', authenticateRole('admin'), EditeurController.createEditeur);
router.get('/getEditeurs', authenticateRole('admin'), EditeurController.getEditeurs);
router.get('/getEditeurById/:id', authenticateRole('admin'), EditeurController.getEditeurById);
router.put('/updateEditeur/:id', authenticateRole('admin'), EditeurController.updateEditeur);
router.delete('/deleteEditeur/:id', authenticateRole('admin'), EditeurController.deleteEditeur);

module.exports = router;
