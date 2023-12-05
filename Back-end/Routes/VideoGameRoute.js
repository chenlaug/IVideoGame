const express = require('express');
const router = express.Router();

const VideoGameController = require('../Controllers/VideoGameController');
const multer = require('../Middlewares/Multer');
const authenticateRole = require('../Middlewares/Auth');

router.post('/createGame', authenticateRole('user'), multer, VideoGameController.createGame);
router.get('/getAllGames', authenticateRole(['user', 'admin']), VideoGameController.getAllGames);
router.get('/getGame/:id', authenticateRole(['user', 'admin']), VideoGameController.getGame);
router.put('/updateGame/:id', authenticateRole('user'), VideoGameController.updateGame);
router.put('/updateImageGame/:id', authenticateRole('user'), multer, VideoGameController.updateImageGame);
router.delete('/deleteGame/:id', authenticateRole('user'), VideoGameController.deleteGame);

module.exports = router;
