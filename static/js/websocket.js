import {validation} from "./validation.js";
import {chat} from "./chat.js";
import {dragndrop} from "./dragndrop.js";
import {timer} from "./timer.js";


export let webSocket = {

    socket : io.connect('http://' + document.domain + ':' + location.port,{transports: ['websocket']}),


    initConnectionEvent : function() {
        webSocket.socket.on('connect',function(){
            $('#waiting-dialoge').modal('show');
            webSocket.socket.emit('join','join');
        });
    },


    sendMove : function(element, source, target){
        let newCors = {yCor: target.dataset.ycor, xCor: target.dataset.xcor};
        let moveData = {element:element.id,source:source.id,target:target.id, newCors};
        webSocket.socket.emit('send_move',moveData);
    },


    startGame : function(data){
        let username = document.querySelector('#chessboard').dataset.nickname;
        if(username !== data) webSocket.socket.emit('start_game','startgame');
    },


    startGameHandler : function(data) {
        dragndrop.initDragndrop();
        setTimeout(()=>$('#waiting-dialoge').modal('hide'),1000);
        if(validation.isYourTurn()){
            timer.startTimer();
        }
    },

    sendChat : function(input,usrname){
        let data = {message:input,username:usrname};
        webSocket.socket.emit('send_chat',data);
    },


    timeOut : function(){
        webSocket.socket.emit('time_out','timeout');
    },


    sendKill :function(enemyId){
        webSocket.socket.emit('send_kill', enemyId);
    },


    killHandler : function(enemyId){
        document.querySelector(`#${enemyId}`).remove();
    },


    moveHandler : function(moveData){
        let piece = document.querySelector("#" + moveData.element);
        let clone = piece.cloneNode(true);
        let sourceCell = document.querySelector("#" + moveData.source);
        let targetCell = document.querySelector("#" + moveData.target);
        clone.dataset.steps = Number(clone.dataset.steps) + 1;
        sourceCell.dataset.active = false;
        targetCell.dataset.active = true;
        piece.remove();
        targetCell.appendChild(clone);
        validation.setTurn();
    },


    timeOutHandler : function(data) {
        validation.setTurn();
    },



    initTimeout : function() {
        webSocket.socket.on('timeOut',function(data) {
            webSocket.timeOutHandler(data);
        });
    },


    initStartGame : function() {
        webSocket.socket.on('startGame',function(data) {
            webSocket.startGameHandler(data);
        });
    },


    initMoveEvent : function () {
        webSocket.socket.on('move',function(moveData) {
            webSocket.moveHandler(moveData);
        });
    },


    initConnection : function () {
        webSocket.socket.on('joined',function(data) {
            console.log(`User: ${data} has connected!`);
            chat.autoMessage(`${data} has connected!`);
            webSocket.startGame(data);
        });
    },


    initKillEvent : function () {
        webSocket.socket.on('kill',function(enemyId) {
            webSocket.killHandler(enemyId);
        });
    },

    initChatEvent : function() {
        webSocket.socket.on('chat',function(data){
            let chat = document.querySelector('#chat');
            chat.innerHTML += `<p><b>${data.username}:</b> ${data.message}</p>`;
            chat.scrollTop = chat.scrollHeight;
        })
    },



    initWebSocket : function(){
        webSocket.initConnectionEvent();
        webSocket.initConnection();
        webSocket.initMoveEvent();
        webSocket.initKillEvent();
        webSocket.initChatEvent();
        webSocket.initTimeout();
        webSocket.initStartGame();
    },
};

