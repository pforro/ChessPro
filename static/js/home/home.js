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
        home.socket.on('refreshHome',function(){
            location.reload();
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


    initDeleteGameButton : function() {
        let btns = document.querySelectorAll('.delete');
        for(let btn of btns){
            btn.addEventListener('click',function(){
                fetch(btn.dataset.url,{method:'GET'})
                    // .then(response => response.json())
                    .then(() => home.socket.emit('refresh_home','refresh'));
            })
        }
    },


    sendNewGameData : function(formData) {
        let options = {method:'POST',body:formData};
        fetch(home.baseURL + '/newgame',options)
            .then(response => response.json())
            .then(() => home.socket.emit('refresh_home','refresh'));
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


    loadGamesOnStartup : function () {
        let options = {method:'GET'};
        fetch(home.baseURL + '/rooms',options)
            .then(response => response.json())
            .then(data => console.log(data))
    }
};
