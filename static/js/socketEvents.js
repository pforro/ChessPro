import {validation} from "./validation.js";
import {chat} from "./chat.js";
import {dragndrop} from "./dragndrop.js";
import {timer} from "./timer.js";


export let socketEvents = {

    socket : io.connect('http://' + document.domain + ':' + location.port,{transports: ['websocket']}),


    initConnectionEvent : function() {
        socketEvents.socket.on('connect',function(){
            $('#waiting-dialoge').modal('show');
            socketEvents.socket.emit('join','join');
        });
    },


    sendMove : function(element, source, target){
        let newCors = {yCor: target.dataset.ycor, xCor: target.dataset.xcor};
        let moveData = {element:element.id,source:source.id,target:target.id, newCors};
        socketEvents.socket.emit('send_move',moveData);
    },


    sendExit : function () {
        socketEvents.socket.emit('exit','exit');
    },


    exitHandler : function () {
        $('#leave-dialoge').modal('show');
        setTimeout(() => location.replace('http://' + document.domain + ':' + location.port + '/home'),4000);
    },



    startGame : function(data){
        let username = document.querySelector('#chessboard').dataset.nickname;
        if(username !== data) socketEvents.socket.emit('start_game','startgame');
    },


    startGameHandler : function(data) {
        dragndrop.initDragndrop();
        setTimeout(()=>{
            $('#waiting-dialoge').modal('hide');
            if(validation.isYourTurn()){
                timer.startTimer();
            }
        },3000);
    },

    sendChat : function(input,usrname){
        let data = {message:input,username:usrname};
        socketEvents.socket.emit('send_chat',data);
    },


    timeOut : function(){
        socketEvents.socket.emit('time_out','timeout');
    },


    sendKill :function(enemyId){
        socketEvents.socket.emit('send_kill', enemyId);
    },


    killHandler : function(enemyId){
        let enemy = document.querySelector(`#${enemyId}`);
        let enemyColor = enemy.dataset.color;
        let clone = enemy.cloneNode(true);
        enemy.remove();
        clone.style.width = '16%';
        clone.style.display = 'inline-block';
        if(validation.getOwnColor() === 'Black') clone.style.transform = 'rotate(360deg)';
        document.querySelector(`#${enemyColor}-folks`).appendChild(clone);
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
        socketEvents.socket.on('timeOut',function(data) {
            socketEvents.timeOutHandler(data);
        });
    },


    initStartGame : function() {
        socketEvents.socket.on('startGame',function(data) {
            socketEvents.startGameHandler(data);
        });
    },


    initMoveEvent : function () {
        socketEvents.socket.on('move',function(moveData) {
            socketEvents.moveHandler(moveData);
        });
    },


    initExit : function () {
        socketEvents.socket.on('redirect', function (data) {
            socketEvents.exitHandler();
        })
    },

    initConnection : function () {
        socketEvents.socket.on('joined',function(data) {
            chat.autoMessage(`${data} has connected!`);
            socketEvents.startGame(data);
        });
    },


    initKillEvent : function () {
        socketEvents.socket.on('kill',function(enemyId) {
            socketEvents.killHandler(enemyId);
        });
    },


    initChatEvent : function() {
        socketEvents.socket.on('chat',function(data){
            let chat = document.querySelector('#chat');
            chat.innerHTML += `<p><b>${data.username}:</b> ${data.message}</p>`;
            chat.scrollTop = chat.scrollHeight;
        })
    },


    initWebSocket : function(){
        socketEvents.initConnectionEvent();
        socketEvents.initConnection();
        socketEvents.initMoveEvent();
        socketEvents.initKillEvent();
        socketEvents.initChatEvent();
        socketEvents.initTimeout();
        socketEvents.initStartGame();
        socketEvents.initExit();
    },
};

