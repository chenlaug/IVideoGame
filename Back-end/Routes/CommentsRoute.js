const express = require('express');
const router = express.Router();

const CommentsController = require('../Controllers/CommentsController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/addComments/:id', authenticateRole('user'), CommentsController.addComments);
router.get('/getAllUserComments/', authenticateRole('user'), CommentsController.getAllUserComments);
router.get('/getGameComments/:id', authenticateRole('user'), CommentsController.getGameComments);
router.delete('/deleteComments/:id', authenticateRole('user', 'admin'), CommentsController.deleteComments);
router.put('/updateComment/:id', authenticateRole('user'), CommentsController.updateComment);
router.get('/getComments', authenticateRole('user'), CommentsController.getComments);

module.exports = router;
