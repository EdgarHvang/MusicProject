const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.midleware');
const musicController = require('../controllers/music.controller');

router.post('/login', authController.login);

router.post('/logout', authMiddleware.checkAuth, musicController.ulogout);

module.exports = router;