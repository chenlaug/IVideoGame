const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/signIn', UserController.signIn);
router.post('/login', UserController.login);
router.get('/confirmAccount/:token', UserController.confirmAccount);
router.get('/getUserFromToken', authenticateRole('user'), UserController.getUserFromToken);
router.get('/getAllUsers', authenticateRole('user'), UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUser);
router.put('/updateUser/:id', authenticateRole('user', 'admin'), UserController.updateUser);
router.delete('/deleteUser/:id', authenticateRole('admin'), UserController.deleteUser);
router.delete('/deleteUserFromToken', authenticateRole('user'), UserController.deleteUserFromToken);
router.post('/requestPasswordReset', UserController.requestPasswordReset);
router.post('/resetPassword', UserController.resetPassword);
router.get('/getUserFavorites', authenticateRole('user'), UserController.getUserFavorites);
router.delete('/removeGameFromFavorites/:id', authenticateRole('user'), UserController.removeGameFromFavorites);
router.post('/addToFavorites/:id', authenticateRole('user'), UserController.addToFavorites);

module.exports = router;
