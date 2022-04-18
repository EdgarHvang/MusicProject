const express = require('express');
const router = express.Router();

const musicRoutes = require('./music.route');
const authRoutes = require('./auth.route');

router.use('/music', musicRoutes);
router.use('/auth', authRoutes);

module.exports = router;