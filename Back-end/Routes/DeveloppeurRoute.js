const express = require('express');
const router = express.Router();

const DeveloppeurController = require('../Controllers/DeveloppeurController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/createDeveloppeur', authenticateRole('user'), DeveloppeurController.createDeveloppeur);
router.get('/getDeveloppeurs', authenticateRole('user'), DeveloppeurController.getDeveloppeurs);
router.get('/getDeveloppeurById/:id', authenticateRole('user'), DeveloppeurController.getDeveloppeurById);
router.put('/updateDeveloppeur/:id', authenticateRole('user'), DeveloppeurController.updateDeveloppeur);
router.delete('/deleteDeveloppeur/:id', authenticateRole('user'), DeveloppeurController.deleteDeveloppeur);

module.exports = router;
