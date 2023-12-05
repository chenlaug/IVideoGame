const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/signIn', UserController.signIn);
router.post('/login', UserController.login);
router.get('/confirmAccount/:token', UserController.confirmAccount);
router.post('/createUserAdmin', authenticateRole('user'), UserController.createUserAdmin);
router.get('/getUserFromToken', authenticateRole(['user', 'admin']), UserController.getUserFromToken);
router.get('/getAllUsers', authenticateRole('admin'), UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUser);
router.put('/updateUser/:id', authenticateRole(['user', 'admin']), UserController.updateUser);
router.delete('/deleteUser/:id', authenticateRole('admin'), UserController.deleteUser);
router.delete('/deleteUserFromToken', authenticateRole(['user', 'admin']), UserController.deleteUserFromToken);
router.post('/requestPasswordReset', UserController.requestPasswordReset);
router.post('/resetPassword', UserController.resetPassword);
router.get('/getUserFavorites', authenticateRole(['user', 'admin']), UserController.getUserFavorites);
router.delete('/removeGameFromFavorites/:id', authenticateRole(['user', 'admin']), UserController.removeGameFromFavorites);
router.post('/addToFavorites/:id', authenticateRole(['user', 'admin']), UserController.addToFavorites);

module.exports = router;
