import {validation} from "./validation.js";

export let webSocket = {

    socket : io.connect('http://' + document.domain + ':' + location.port,{transports: ['websocket']}),


    initConnectionEvent : function() {
        webSocket.socket.on('connect',function(){
            webSocket.socket.emit('join','User has connected!')
        });
    },


    sendMove : function(element, source, target){
        let newCors = {yCor: target.dataset.ycor, xCor: target.dataset.xcor}
        let moveData = {element:element.id,source:source.id,target:target.id, newCors};
        webSocket.socket.emit('send_move',moveData);
    },

    sendChat : function(input,usrname){
        let data = {message:input,username:usrname};
        webSocket.socket.emit('send_chat',data);
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
        // validation.showTurn();
    },


    initMoveEvent : function () {
        webSocket.socket.on('move',function(moveData) {
            webSocket.moveHandler(moveData);
        });
    },

    initConnectionMessage : function () {
        webSocket.socket.on('join',function(data) {
            console.log(`User: ${data.username} has connected!`)
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
        webSocket.initConnectionMessage();
        webSocket.initMoveEvent();
        webSocket.initKillEvent();
        webSocket.initChatEvent();
    },
};

