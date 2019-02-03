export let home = {

    baseURL : 'http://' + document.domain + ':' + location.port,

    socket : io.connect('http://' + document.domain + ':' + location.port,{transports:['websocket']}),


    connectToServer : function() {
        home.socket.on('connect',function(){
            home.socket.emit('join_room','join');
        });
        home.socket.on('joined',function() {
            console.log('joined to room: home!');
        });
    },


    refreshOnEvent : function () {
        home.socket.on('refreshGames',function(){
            let tbody = document.querySelector('tbody');
            if(tbody) tbody.remove();
            home.loadGames();
        })
    },


    initSocketEvents : function() {
        home.connectToServer();
        home.refreshOnEvent();
    },


    initNewGameButton : function() {
        let button = document.querySelector('#newgame');
        button.addEventListener('click',function(){
            $('#newgame-dialog').modal('show');
        })
    },


    initDeleteGameButtons : function() {
        let btns = document.querySelectorAll('.delete');
        for(let btn of btns){
            btn.addEventListener('click',function(){
                fetch(btn.dataset.url,{method:'GET'})
                    .then(() => home.socket.emit('refresh_games','refresh'));
            })
        }
    },


    initPlayGameButtons : function() {
        let btns = document.querySelectorAll('.play');
        for(let btn of btns){
            btn.addEventListener('click',function(){
                location.replace(btn.dataset.url);
            })
        }
    },


    sendNewGameData : function(formData) {
        let options = {method:'POST',body:formData};
        fetch(home.baseURL + '/newgame',options)
            .then(response => response.json())
            .then(() => home.socket.emit('refresh_games','refresh'));
    },


    initSubmitModalBtn : function() {
        let button = document.querySelector("#submit-modal");
        button.addEventListener('click',function(){
            let name = document.querySelector("#input-name").value;
            let opponent = document.querySelector("#select-opponent").value;
            let color = document.querySelector("#select-color").value;
            let formData = new FormData();
            formData.append('board_name',name);
            formData.append('opponent_id',opponent);
            formData.append('color',color);
            home.sendNewGameData(formData);
            $('#newgame-dialog').modal('hide');
        })
    },


    loadGames : function () {
        let options = {method:'GET'};
        fetch(home.baseURL + '/rooms',options)
            .then(response => response.json())
            .then(rooms => {
                home.buildGamesTable(rooms);
                home.initPlayGameButtons();
                home.initDeleteGameButtons();
            });
    },


    buildGamesTable : function (rooms) {
        let tbody = document.createElement('tbody');
        document.querySelector('table').appendChild(tbody);
        let headers = ['board_name','owners'];
        for(let room of rooms){
            let tr = document.createElement('tr');
            for(let header of headers){
                let td = document.createElement('td');
                td.textContent = room[header];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            home.createActionButtons(room);
        }
    },


    createActionButtons : function (room) {
        let td = document.createElement('td');
        let play = document.createElement('button');
        play.className = 'btn btn-success btn-sm play';
        play.dataset.url = home.baseURL + '/game/' + room.board_name;
        play.textContent = 'Play';
        let del = document.createElement('button');
        del.className = "btn btn-danger btn-sm delete";
        del.dataset.url = home.baseURL + '/delete-room/' + room.board_name + '/' + room.id;
        del.textContent = 'Delete';
        td.appendChild(play);
        td.appendChild(del);
        let tr = document.querySelector('tbody').lastElementChild;
        tr.appendChild(td);
    },


};
