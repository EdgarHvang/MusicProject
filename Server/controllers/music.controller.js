const { userSetUp, addNewSongById, deleteSongById, userLogOut,
    getInterestedSongs, getSongsByKeyword, changePlayMode, playNextSong,
    keepCurrentSong } = require('../models/user');
const User = require('../models/user');
const Song = require('../models/song');

const addNewSongWithId = (req, res, next) => {
    console.log('add new song with id running...');
    console.log(req.params);
    let auth = req.auth;
    console.log(auth);
    res.status(200).json(addNewSongById(req.params.songId, auth));
}

const deleteSongWithId = (req, res, next) => {
    console.log('delete song with id running...');
    console.log(req.params);
    let auth = req.auth;
    console.log(auth);
    res.status(200).json(deleteSongById(req.params.songId, auth));
}

const interestedSongs = (req, res, next) => {
    console.log('get interested songs running...');
    // let auth = req.auth;
    res.status(200).json(getInterestedSongs());
}

const searchSongsWithKeyword = (req, res, next) => {
    console.log('get searched songs running...');
    console.log(req.params.keyword);
    res.status(200).json(getSongsByKeyword(req.params.keyword));
}

const changeThePlayMode = (req, res, next) => {
    console.log('change playmode running...');
    console.log(req.body.playMode);
    let auth = req.auth;
    res.status(200).json(changePlayMode(req.body.playMode, auth));
}

const playNext = (req, res, next) => {
    console.log('next song running...');
    let auth = req.auth;
    res.status(200).json(playNextSong(req.body.playMode, auth));

}

const currentSong = (req, res, next) => {
    console.log('current song running...');
    let auth = req.auth;
    console.log(auth);
    console.log(req.body.songIndex);
    res.status(200).json(keepCurrentSong(req.body.songIndex, auth));
}

const ulogout = (req, res, next) => {
    console.log('user log out running');
    let auth = req.auth;
    res.status(200).json(userLogOut(auth));
}

const setUpData = (req, res, next) => {
    const song1 = new Song('1', 'Circle', "2021-01-11", "/Client/mp3/Circles-Post Malone.mp3");
    const song2 = new Song('2', 'Cold Heart', "2021-01-11", "/Client/mp3/Cold Heart (PNAU Remix)-Elton John、Dua Lipa.mp3");
    const song3 = new Song('3', 'Levitating', "2021-01-11", "/Client/mp3/Levitating-Dua Lipa.mp3");
    const song4 = new Song('4', 'Psycho', "2021-01-11", "/Client/mp3/Psycho-Post Malone、Ty Dolla $ign.mp3");
    const song5 = new Song('5', 'Sunflower', "2021-01-11", "/Client/mp3/Sunflower (Spider-Man_ Into the Spider.mp3");


    let list = [song1, song2, song3, song4, song5];
    let list1 = [song1, song2, song3, song4, song5];
    let list2 = [song1, song2];
    let list3 = [song2];

    let playmode = { "repeat1": 0, "normal": 1, "shuffle": 2 };

    let user1 = new User('ed', '123', playmode.normal, list1);
    let user2 = new User('mel', '234', playmode.normal, list2);
    let user3 = new User('jay', '345', playmode.normal, list3);
    let users = [user1, user2, user3];

    console.log(users);
    console.log(list);
    res.status(200).json(userSetUp(users, list));
}


module.exports = {
    addNewSongWithId, setUpData, deleteSongWithId,
    ulogout, interestedSongs, searchSongsWithKeyword, changeThePlayMode, playNext, currentSong
}