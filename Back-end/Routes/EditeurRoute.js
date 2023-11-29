const express = require('express');
const router = express.Router();

const EditeurController = require('../Controllers/EditeurController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/createEditeur', authenticateRole('user'), EditeurController.createEditeur);
router.get('/getEditeurs', authenticateRole('user'), EditeurController.getEditeurs);
router.get('/getEditeurById/:id', authenticateRole('user'), EditeurController.getEditeurById);
router.put('/updateEditeur/:id', authenticateRole('user'), EditeurController.updateEditeur);
router.delete('/deleteEditeur/:id', authenticateRole('user'), EditeurController.deleteEditeur);

module.exports = router;
