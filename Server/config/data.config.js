const { userSetUp } = require('../models/user');
const Song = require('../models/song');
const User = require('../models/user');

const setUpData = () => {

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


    userSetUp(users, list)
}

module.exports = { setUpData }