const { userSetUp } = require('../models/user');
const Song = require('../models/song');
const User = require('../models/user');

const setUpData = () => {

    const song1 = new Song('1', 'song1', "2021-01-11");
    const song2 = new Song('2', 'song2', "2021-01-11");
    const song3 = new Song('3', 'song3', "2021-01-11");
    let list = [song1, song2, song3];
    let list1 = [song1, song2, song3];
    let list2 = [song1, song2];
    let list3 = [song2];

    let playmode = { "repeat1": 0, "repeatAll": 1, "shuffle": 2 };

    let user1 = new User('ed', '123', playmode.repeat1, list1);
    let user2 = new User('mel', '234', playmode.repeat1, list2);
    let user3 = new User('jay', '345', playmode.repeat1, list3);
    let users = [user1, user2, user3];


    userSetUp(users, list)
}

module.exports = { setUpData }