import {validation} from "./validation.js";

export let webSocket = {

    room : document.querySelector('#chessboard').dataset.boardname,

    socket :    io.connect('http://' + document.domain + ':' + location.port
                ,{transports: ['websocket']}),


    initConnectionEvent : function() {
        webSocket.socket.on('connect',function(){
            webSocket.socket.emit('join','User has connected!')
        });
    },

    // initConnectionEvent : function() {
    //     webSocket.socket.on('connect',function(socket){
    //         webSocket.socket.join(webSocket.room);
    //     })
    // },


    sendMove : function(element, source, target){
        let moveData = {element:element.id,source:source.id,target:target.id};
        webSocket.socket.emit('send_move',moveData);
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
        webSocket.socket.on('proba',function(moveData) {
            // webSocket.moveHandler(moveData);
            console.log(moveData)
        });
    },


    initKillEvent : function () {
        webSocket.socket.on('kill',function(enemyId) {
            webSocket.killHandler(enemyId);
        });
    },


    initWebSocket : function(){
        webSocket.initConnectionEvent();
        webSocket.initMoveEvent();
        webSocket.initKillEvent();
    },
};

