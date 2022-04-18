const { use } = require("../routers");

let songs = [];
let users = [];

module.exports = class User {

    constructor(userName, password, playmode, songList, userToken) {
        this.userName = userName;
        this.password = password;
        this.songList = songList;
        this.playmode = playmode;
        this.userToken = userToken;
    }

    static getAllUsers(){
        return users;
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

   static addNewSongById(songId,auth) {
        // console.log(songId);
        let newSong = songs.filter((s) => s.songId === songId)[0];
        console.log(newSong);
        // console.log(this);
        let user = users.filter((s)=> s.userToken === auth)[0];
        user.songList.push(newSong);
                console.log(user);
        return user;
    }

    deleteSongById(songId) {
        this.songList = this.songList.filter((s) => s.songId !== songId);
        return this.songList;
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
                let user = users.filter((u) => u.userName = info.userName)[0];
                user.userToken = userToken;
                users = users.filter((u) => u.userName !== info.userName);
                users.push(user);
                return user;
            } else {
                const err = new Error();
                err.status = 403;
                err.message = "Wrong password";
                return err;
            }
        }
    }

    static userLogOut(info) {
        let user = users.filter((u) => u.userName = userName)[0];
        user.userToken = null;
        users = users.filter((u) => u.userName !== info.userName);
        users.push(user);
        return user;

    }



}