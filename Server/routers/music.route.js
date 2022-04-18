const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middleware/auth.midleware');

router.post('/setUpData',musicController.setUpData) //setUp

// router.post('/:songId', authMiddleware.checkAuth, musicController.addNewSongWithId);  //production
router.post('/:songId', musicController.addNewSongWithId); //test


router.delete('/', (req, res) => { })

module.exports = router;