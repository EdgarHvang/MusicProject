const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middleware/auth.midleware');

router.get('/interested', authMiddleware.checkAuth, musicController.interestedSongs);

router.get('/search/:keyword', authMiddleware.checkAuth, musicController.searchSongsWithKeyword);

router.post('/setUpData',musicController.setUpData) //setup some default data

router.post('/:songId', authMiddleware.checkAuth, musicController.addNewSongWithId); 

router.delete('/:songId', authMiddleware.checkAuth, musicController.deleteSongWithId); 

router.post('/play/playMode', authMiddleware.checkAuth, musicController.changeThePlayMode);

router.get('/play/nextSong', authMiddleware.checkAuth, musicController.playNext);

router.post('/play/currentSong/:songId', authMiddleware.checkAuth, musicController.currentSong);


module.exports = router;