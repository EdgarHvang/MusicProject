window.onload = function () {
    const player = document.getElementById("player");
    player.addEventListener("ended", (e) => {
        if (playMode == 0) { // repeat
        } else if (playMode == 1) { // song by song
            if (playlist.length - 1 > currentUser.songIndex) {
                player.src = playlist[++currentUser.songIndex].path
                changeSong(currentUser.songIndex);
            } else {
                player.src = playlist[0].path
                changeSong(0)
                currentUser.songIndex = 0;
            }
        } else if (playMode == 2) { // shuffle
            currentUser.songIndex = Math.ceil(Math.random() * playlist.length - 1);
            player.src = playlist[currentUser.songIndex].path
            changeSong(currentUser.songIndex)
        }

        getElementById("songName").textContent = playlist[currentUser.songIndex].title;
        player.play();
    }, false);

    let searchtf = document.getElementById('searchInput');
    getElementById("wrongPA").style.display = "none";

    searchtf.oninput = function () {
        console.log(this.value);
        if (this.value === "") {
            console.log(totalSonglist);
            getElementById('totalSongsBody').innerHTML = "";
            renderTotalSongs(totalSonglist);
        } else {
            getElementById('totalSongsBody').innerHTML = "";
            search(this.value);
        }
    }
    searchtf.onblur = function () {
        if (this.value === "") {
            getElementById('totalSongsBody').innerHTML = "";
            renderTotalSongs(totalSonglist);
        }
    }

}


let currentUser = null;
let playlist = [];
let playMode = 0;
let searchList = [];
let totalSonglist = [];



const changePlayMode = (event) => {
    sendRequest("http://localhost:3000/music/play/playMode", "POST", {
        playMode: parseInt(event.target.value, 10),
    }).then(data => {
        playMode = parseInt(event.target.value, 10);
        event.target.classList = "btn btn-info";

        document.getElementsByName("playModeButton").forEach(element => {
            if (element.value != event.target.value) element.classList = "btn btn-primary"
            else element.classList = "btn btn-info"
        })

    })
}

const changeSong = (idx) => {
    sendRequest("http://localhost:3000/music/play/currentSong/songIndex", "POST", {
        songIndex: idx,
    }).then((data) => {
        currentUser.songIndex = idx;
    });
}

const previousSong = () => {
    const player = document.getElementById("player");
    if (currentUser.songIndex > 0) {
        player.src = playlist[--currentUser.songIndex].path
        changeSong(currentUser.songIndex);
    } else {
        player.src = playlist[playlist.length - 1].path
        changeSong(playlist.length - 1)
        currentUser.songIndex = playlist.length - 1;
    }
    getElementById("songName").textContent = playlist[currentUser.songIndex].title;
    player.play();
}

const nextSong = () => {
    const player = document.getElementById("player");
    if (playlist.length - 1 > currentUser.songIndex) {
        player.src = playlist[++currentUser.songIndex].path
        changeSong(currentUser.songIndex);
    } else {
        player.src = playlist[0].path
        changeSong(0)
        currentUser.songIndex = 0;
    }
    getElementById("songName").textContent = playlist[currentUser.songIndex].title;
    player.play();
}

const play = (idx) => {
    const player = document.getElementById("player");
    player.src = playlist[idx].path;
    player.play();
}

const fetchTotalSongs = () => {
    sendRequest("http://localhost:3000/music/interested", "GET", null)
    .then((data) =>{ 
        totalSonglist = data;
        renderTotalSongs(data)})
}

const renderTotalSongs = (songs) => {
    songs.forEach(song => {
        const tbody = document.getElementById("totalSongsBody");

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        const addBtn = document.createElement('button');
        addBtn.classList = 'btn btn-primary';
        addBtn.textContent = 'add';
        addBtn.addEventListener("click", () => sendRequest("http://localhost:3000/music/" + song.songId, "POST", null).then(data => {
            getElementById('playlistBody').innerHTML = "";
            playlist.push(song)
            renderPlaylist(playlist);
        }))

        td1.textContent = song.songId;
        td2.textContent = song.title;
        td3.textContent = song.releaseDate;
        td4.appendChild(addBtn)

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    })
}

const renderPlaylist = (songs) => {
    songs.forEach((song, idx) => {
        const tbody = getElementById("playlistBody");

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        const deleteBtn = document.createElement('button');
        deleteBtn.classList = 'btn btn-danger';
        deleteBtn.textContent = 'delete';
        deleteBtn.addEventListener("click", () => sendRequest("http://localhost:3000/music/" + song.songId, "DELETE", null).then((data) => {
            getElementById('playlistBody').innerHTML = "";
            playlist.splice(idx, 1);
            renderPlaylist(playlist);
        }))

        const playBtn = document.createElement('button');
        playBtn.classList = 'btn btn-primary';
        playBtn.textContent = 'play';
        playBtn.addEventListener("click", () => {
            changeSong(idx)
            play(idx)
            getElementById("songName").textContent = playlist[idx].title;
        })

        td1.textContent = song.songId;
        td2.textContent = song.title;
        td3.appendChild(deleteBtn)
        td4.appendChild(playBtn)

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    })
}

const search = ()=>{

    const keyword = getElementById("searchInput").value;
    sendRequest('http://localhost:3000/music/search/'+keyword,'GET',).
    then(data => { 
        console.log(data);
        renderTotalSongs(data);
        })

}

const login = () => {

    const username = getElementById("usernameInput").value
    const password = getElementById("passwordInput").value

    sendRequest('http://localhost:3000/auth/login', 'POST', {
        userName: username,
        password: password,
    }).then(data => {
        console.log(data);
        currentUser = data;

        if(data.status === 403){
            getElementById("wrongPA").style.display = "";
            setTimeout(()=>{
                getElementById("wrongPA").style.display = "none";
            },3000)
            return;
        }

        getElementById("login").style.display = "none"
        getElementById("logout").style.display = ""
        getElementById("container").style.display = ""
        getElementById("footer").style.display = ""
        getElementById("welcome").style.display = "none";

        sessionStorage.setItem('token', data.userToken);

        fetchTotalSongs();
        renderPlaylist(data.songList);
        playlist = data.songList;
        playMode = currentUser.playMode;

        document.getElementById("player").ssrc = playlist[currentUser.songIndex].path;

        document.getElementsByName("playModeButton").forEach(element => {
            if (element.value != currentUser.playMode) element.classList = "btn btn-primary"
            else element.classList = "btn btn-info"
        })

        getElementById("songName").textContent = playlist[currentUser.songIndex].title;
    })
}

const logout = () => {
    // sessionStorage.removeItem('token');
    sessionStorage.setItem('token',null);

    getElementById("login").style.display = ""
    getElementById("logout").style.display = "none"
    getElementById("container").style.display = "none"
    getElementById("footer").style.display = "none"

    getElementById("usernameInput").value = "";
    getElementById("passwordInput").value = "";

    getElementById('totalSongsBody').innerHTML = "";
    getElementById('playlistBody').innerHTML = "";

    currentUser = null;
    getElementById("welcome").style.display = "";

}

const sendRequest = (url, method, body) => {
    if (method === "GET") {
        return fetch(url, {
            method: method,
            headers: sessionStorage.getItem('token') ? {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('token'),
            } : {
                'Content-type': 'application/json',
            },
        }).then(response => response.json()).then(data => { return data });
    }
    else {
        return fetch(url, {
            method: method,
            headers: sessionStorage.getItem('token') !== null ? {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('token'),
            } : {
                'Content-type': 'application/json',
            },
            body: body && JSON.stringify(body)
        }).then(response => response.json()).then(data => { return data });
    }
}

const getElementById = (id) => {
    return document.getElementById(id);
}