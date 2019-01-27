import {dom} from "./dom.js"
import {gameControl} from "./game_control.js";
import {chat} from "./chat.js";
import {dragndrop} from "./dragndrop.js";
import {timer} from "./timer.js";


export let socketEvents = {


    socket : io.connect('http://'+document.domain+':'+location.port,{transports:['websocket']}),


    sendMove : function(element, source, target){
        let newCors = {yCor: target.dataset.ycor, xCor: target.dataset.xcor};
        let moveData = {element:element.id,source:source.id,target:target.id, newCors};
        socketEvents.socket.emit('send_move',moveData);
    },



    sendExit : function () {
        socketEvents.socket.emit('send_exit','exit');
    },



    sendStartGame : function(data){
        let username = document.querySelector('#chessboard').dataset.username;
        if(username !== data) socketEvents.socket.emit('send_start_game','startgame');
    },



    sendChatMessage : function(input, usrname){
        let data = {message:input,username:usrname};
        socketEvents.socket.emit('send_chat_message',data);
    },



    sendTimeOut : function(){
        socketEvents.socket.emit('time_out','timeout');
    },



    sendKill :function(enemyId){
        socketEvents.socket.emit('send_kill', enemyId);
    },



    connectToServer : function() {
        socketEvents.socket.on('connect',function(){
            document.querySelector('#modal-message')
                .textContent = 'Waiting for your opponent...';
            $('#modal-dialoge').modal('show');
            socketEvents.socket.emit('join_room','join');
        });
    },



    initTimeout : function() {
        socketEvents.socket.on('timeOut',function() {
            chat.autoMessage("Time out!");
            gameControl.setTurn();
        });
    },



    initStartGame : function() {
        socketEvents.socket.on('startGame',function() {
            dragndrop.initDragndrop();
            setTimeout(()=>{
                $('#modal-dialoge').modal('hide');
                if(gameControl.isYourTurn()) timer.startTimer();
            },3000);
        });
    },



    initMove : function () {
        socketEvents.socket.on('move',function(moveData) {
            let piece = document.querySelector("#" + moveData.element);
            let clone = piece.cloneNode(true);
            let sourceCell = document.querySelector("#" + moveData.source);
            let targetCell = document.querySelector("#" + moveData.target);
            clone.dataset.steps = Number(clone.dataset.steps) + 1;
            sourceCell.dataset.active = false;
            targetCell.dataset.active = true;
            piece.remove();
            targetCell.appendChild(clone);
            gameControl.setTurn();
        });
    },



    initExit : function () {
        socketEvents.socket.on('exit', function () {
            document.querySelector('#modal-message')
                .textContent = 'Your opponent has left the game...';
            $('#modal-dialoge').modal('show');
            timer.stop();
            setTimeout(()=>location.replace(dom.baseURL+'/home'),3000);
        })
    },



    initConnection : function () {
        socketEvents.socket.on('joined',function(data) {
            chat.autoMessage(`${data} has connected!`);
            socketEvents.sendStartGame(data);
        });
    },



    initKillEvent : function () {
        socketEvents.socket.on('kill',function(enemyId) {
            let enemy = document.querySelector(`#${enemyId}`);
            let enemyColor = enemy.dataset.color;
            let clone = enemy.cloneNode(true);
            enemy.remove();
            clone.style.width = '16%';
            clone.style.display = 'inline-block';
            if(gameControl.getOwnColor() === 'Black') clone.style.transform = 'rotate(360deg)';
            document.querySelector(`#${enemyColor}-folks`).appendChild(clone);
        });
    },



    initChatEvent : function() {
        socketEvents.socket.on('chatMessage',function(data){
            let chat = document.querySelector('#chat');
            chat.innerHTML += `<p><b>${data.username}:</b> ${data.message}</p>`;
            chat.scrollTop = chat.scrollHeight;
        })
    },



    initSocketEvents : function(){
        socketEvents.connectToServer();
        socketEvents.initConnection();
        socketEvents.initMove();
        socketEvents.initKillEvent();
        socketEvents.initChatEvent();
        socketEvents.initTimeout();
        socketEvents.initStartGame();
        socketEvents.initExit();
    },
};

