
let songs = [];
let users = [];

module.exports = class User {

    constructor(userName, password, playMode, songList, userToken) {
        this.userName = userName;
        this.password = password;
        this.songList = songList;
        this.playMode = playMode;
        this.userToken = userToken;
        this.currentSongId = 0;
        this.playedList = [];
    }

    static getAllUsers() {
        return users;
    }

    static getInterestedSongs() {
        return songs;
    }

    static userSetUp(usersSet, songsSet) {
        songs = songsSet;
        users = usersSet;
        console.log(users);
        return users;
    }

    loadUserInfo() {
        return this;
    }

    static addNewSongById(songId, auth) {
        console.log(songId);
        let newSong = songs.filter((s) => s.songId === songId)[0];
        console.log(newSong);
        console.log(auth);
        let user = users.filter((s) => s.userToken === auth)[0];
        user.songList.push(newSong);
        console.log(users);
        return user;
    }

    static deleteSongById(songId, auth) {
        let user = users.filter((s) => s.userToken === auth)[0];
        user.songList = user.songList.filter((s) => s.songId !== songId);
        console.log(users);
        return user;
    }

    static getSongsByKeyword(keyword) {
        let res = songs.filter((s) => s.title.includes(keyword));
        return res;
    }

    static changePlayMode(playMode, auth) {
        let user = users.filter((s) => s.userToken === auth)[0];
        user.playMode = playMode;
        console.log(user);
        return user;
    }

    static playNextSong(currentSongId,auth) {
        let user = users.filter((s) => s.userToken === auth)[0];
        let playlist = user.songList;
        switch (user.playMode) {
            case 0: console.log("repeat1")
                break;
            case 1: console.log("normal")
            return getNSong(currentSongId,playlist)
            case 2: console.log("shuffle")
                break;

            default:
                break;
        }
    }

    getNSong(songId,playlist) {
        let song = playlist.filter((s)=>s.songId = songId);
        return song;
    }

    getRSong(songId,playlist){
        
    }

    static keepCurrentSong(songId,auth){
        let user = users.filter((s) => s.userToken === auth)[0];
        user.currentSongId = songId;
        return user;
    }


    static userLogin(info) {
        console.log("info:", info)
        if (users.findIndex((u) => u.userName === info.userName) === -1) {
            const err = new Error();
            err.status = 403;
            err.message = "Wrong user";
            return err;
        } else {
            let usert = users.filter((u) => u.userName === info.userName)[0];
            if (usert.password === info.password) {
                console.log("xx");
                let userToken = Date.now() + info.userName;
                let user = users.filter((u) => u.userName === info.userName)[0];
                // user.userToken = userToken; // product
                user.userToken = "1650260523734ed"; //test
                users = users.filter((u) => u.userName !== info.userName);
                users.push(user);
                console.log(users);
                return user;
            } else {
                const err = new Error();
                err.status = 403;
                err.message = "Wrong password";
                return err;
            }
        }
    }

    static userLogOut(auth) {
        let user = users.filter((u) => u.userToken === auth)[0];
        console.log(user);
        user.userToken = undefined;
        console.log(users);
        return users;
    }



}