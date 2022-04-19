window.onload = function () {


    let currentUser = null;
    let playMode = null;
    let player = document.getElementById('player');
    let urlstring = null;

    player.addEventListener("ended", function (e) {
        if(playMode === 0){
            // let repeatIndex = currentUser.songIndex;
            urlstring = "http://localhost:3000/music/play/currentSong/" + currentUser.songIndex;

        }else if(playMode === 1){
            if (userSonglist.length - 1 > currentUser.songIndex) {
                currentUser.songIndex = ++currentUser.songIndex
                urlstring = "http://localhost:3000/music/play/currentSong/" + currentUser.songIndex;
            } else {
                urlstring = "http://localhost:3000/music/play/currentSong/" + 0;
                currentUser.songIndex = 0;
            }
        }else{
            let range = currentUser.songList.length - 1;
            let randomIndex = Math.ceil(Math.random()*range);
            console.log('randomIndex:',randomIndex);
            urlstring = "http://localhost:3000/music/play/currentSong/" + randomIndex;
            currentUser.songIndex = randomIndex;
        }

        let user = fetch(urlstring, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('userToken'),
            },
        }).then(res => res.json());
        console.log(user);
        player.src = userSonglist[currentUser.songIndex].path;
        player.play();
       
    }, false);

    let usertf = document.getElementById('input1');
    let pwdtf = document.getElementById('input2');
    console.log(usertf);
    console.log(pwdtf);
    let logBtn = document.getElementById('loginBtn');
    let botlb = document.getElementById('blb1');
    botlb.textContent = "Your playlist";
    botlb.hidden = true;
    let searchdiv = document.getElementById('searchdiv');
    searchdiv.hidden = true;
    let logindiv = document.getElementById('logindiv');
    logindiv.hidden = false;

    let normalBtn = document.getElementById("sbys");
    let repeatBtn = document.getElementById("repeat");
    let shuffleBtn = document.getElementById("shuffle");

    normalBtn.onclick = function(){
        setPlayMode(1);
    }
    repeatBtn.onclick = function(){
        setPlayMode(0);
    }
    shuffleBtn.onclick = function(){
        setPlayMode(2);
    }

    let userSonglist = []; //userplaylist
    let totalSonglist = []; //totallist

    let logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.hidden = true;
    logoutBtn.onclick = function () {
        logOut();
    }

    logBtn.onclick = function () {
        // login(usertf.value,pwdtf.value);
        login();
    }

    let searchtf = document.getElementById('search');
    searchtf.oninput = function () {
        console.log(this.value);
        if (this.value === "") {
            clearSonglist1();
            totalSonglist.forEach(s => renderSonglist(s));
        } else {
            searchByKeyword(this.value);
        }
    }
    searchtf.onblur = function () {
        if (this.value === "") {
            clearSonglist1();
            totalSonglist.forEach(s => renderSonglist(s));
        }
    }

    async function searchByKeyword(keyword) {

        let url = "http://localhost:3000/music/search/" + keyword;
        let songList = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('userToken'),
            },
        }).then(res => res.json());
        console.log(songList);
        clearSonglist1();
        songList.forEach(s => renderSonglist(s));

    }

    async function login() {
        let user = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(
                {
                    userName: usertf.value,
                    password: pwdtf.value,
                }
            )
        }).then(res => res.json());
        currentUser = user;
        sessionStorage.setItem('userToken', user.userToken);
        user.songList.forEach(s => renderMyPlayList(s));
        let toplb = document.getElementById('tlb1');
        toplb.textContent = "Song you may interested";
        botlb.display = '';
        userSonglist = user.songList;
        playMode = user.playMode


        changePlaymodeBtn();
        console.log(user.songIndex)
        player.src = userSonglist[parseInt(user.songIndex, 10)].path

        botlb.hidden = false;
        logindiv.hidden = true;
        logoutBtn.hidden = false;
        searchdiv.hidden = false;
        getUserInteretedSong();
    }

    async function getUserInteretedSong() {
        let url = "http://localhost:3000/music/interested";
        let songList = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('userToken'),
            },
        }).then(res => res.json());
        console.log(songList);
        clearSonglist1();
        totalSonglist = songList;
        songList.forEach((s) => { renderSonglist(s) });
    }

    async function logOut() {
        let userToken = sessionStorage.getItem('userToken');

        let user = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': userToken,
            },
        }).then(res => {
            alert('logOut Successfully!');

        });
        console.log(user);
        botlb.hidden = true;
        searchdiv.hidden = true;
        logindiv.hidden = false;
        clearSonglist1();
        clearSonglist2();
        logoutBtn.hidden = true;
        toplb.textContent = "welcome to ed Music";
    }

   async function setPlayMode(playMode){

        let user = await fetch('http://localhost:3000/music/play/playMode', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': sessionStorage.getItem('userToken'),
            },
            body : JSON.stringify(
                {
                    playMode: playMode,
                }
            ),

        }).then(res => res.json());
        console.log(user);
        currentUser = user;
        changePlaymodeBtn();
    }

    function changePlaymodeBtn(){
        if (currentUser.playMode == 0) {
            repeatBtn.style = "border-width: 1; background-color: green";
            normalBtn.style = "border-width: 1; background-color: white";
            shuffleBtn.style = "border-width: 1; background-color: white";
        } else if (currentUser.playMode == 1) {
            repeatBtn.style = "border-width: 1; background-color: white";
            normalBtn.style = "border-width: 1; background-color: green";
            shuffleBtn.style = "border-width: 1; background-color: white";
        } else if (currentUser.playMode == 2) {
            repeatBtn.style = "border-width: 1; background-color: white";
            normalBtn.style = "border-width: 1; background-color: white";
            shuffleBtn.style = "border-width: 1; background-color: green";        }
    }

    function clearSonglist1() {
        let list1 = document.getElementById('interestinglist');
        let children = list1.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            list1.removeChild(children[i]);
        }
    }

    function clearSonglist2() {
        let list1 = document.getElementById('myPlaylist');
        let children = list1.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            list1.removeChild(children[i]);
        }
    }

    function renderSonglist(song) {
        console.log(song);
        const div = document.createElement('div');
        div.classList = 'col-lg-4';
        div.id = song.id;
        const songid = document.createElement('p');
        songid.textContent = "Id" + song.songId;
        const songtt = document.createElement('p');
        songtt.textContent = "Title" + song.title;
        const rldate = document.createElement('p');
        rldate.textContent = "releaseDate: " + song.releaseDate;
        div.appendChild(songid);
        div.appendChild(songtt);
        div.appendChild(rldate);
        div.style.width = window.width;
        div.style.height = '50';
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        const actions = document.createElement('p');
        const addBtn = document.createElement('button');
        addBtn.classList = 'btn btn-secondary';
        addBtn.textContent = 'add';
        addBtn.style.cssText = "border:1px dashed yellow";
        addBtn.addEventListener('click', async function (event) {
            console.log("add");
            let urlstring = "http://localhost:3000/music/" + song.songId
            let playlist = await fetch(urlstring, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': sessionStorage.getItem('userToken'),
                },
            }).then(res => res.json());
            console.log(playlist);
            clearSonglist2();
            playlist.forEach(s => renderMyPlayList(s));
        });
        actions.appendChild(addBtn);
        div.appendChild(actions);
        document.getElementById('interestinglist').appendChild(div);
    }

    function renderMyPlayList(song) {
        console.log(song);
        const div = document.createElement('div');
        div.classList = 'col-lg-4';
        div.id = song.id;
        const songid = document.createElement('p');
        songid.textContent = "Id" + song.songId;
        const songtt = document.createElement('p');
        songtt.textContent = "Title" + song.title;
        // const rldate = document.createElement('p');
        // rldate.textContent = "releaseDate: " + song.releaseDate;
        div.appendChild(songid);
        div.appendChild(songtt);
        // div.appendChild(rldate);
        div.style.width = window.width;
        div.style.height = '50';
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        const actions = document.createElement('p');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList = 'btn btn-secondary';
        deleteBtn.textContent = 'delete';
        deleteBtn.style.cssText = "border:1px dashed yellow";
        deleteBtn.addEventListener('click', async function (event) {
            console.log("delete");
            let urlstring = "http://localhost:3000/music/" + song.songId
            let playlist = await fetch(urlstring, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': sessionStorage.getItem('userToken'),
                },
            }).then(res => res.json());
            clearSonglist2();
            playlist.forEach(s => renderMyPlayList(s));

        });
        actions.appendChild(deleteBtn);
        div.appendChild(actions);
        document.getElementById('myPlaylist').appendChild(div);
    }





}