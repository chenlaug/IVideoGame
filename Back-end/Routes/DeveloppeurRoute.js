const express = require('express');
const router = express.Router();

const DeveloppeurController = require('../Controllers/DeveloppeurController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/createDeveloppeur', authenticateRole('admin'), DeveloppeurController.createDeveloppeur);
router.get('/getDeveloppeurs', authenticateRole('admin'), DeveloppeurController.getDeveloppeurs);
router.get('/getDeveloppeurById/:id', authenticateRole('admin'), DeveloppeurController.getDeveloppeurById);
router.put('/updateDeveloppeur/:id', authenticateRole('admin'), DeveloppeurController.updateDeveloppeur);
router.delete('/deleteDeveloppeur/:id', authenticateRole('admin'), DeveloppeurController.deleteDeveloppeur);

module.exports = router;
