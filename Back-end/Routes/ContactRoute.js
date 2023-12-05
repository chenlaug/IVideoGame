const express = require('express');
const router = express.Router();

const ContactController = require('../Controllers/ContactController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/sendMessage', authenticateRole(['user', 'admin']), ContactController.sendMessage);

module.exports = router;
