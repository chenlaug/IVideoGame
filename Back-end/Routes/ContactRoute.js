const express = require('express');
const router = express.Router();

const ContactController = require('../Controllers/ContactController');
const authenticateRole = require('../Middlewares/Auth');

router.post('/sendMessage', authenticateRole('user'), ContactController.sendMessage);

module.exports = router;
