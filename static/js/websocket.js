import {validation} from "./validation.js";

export let webSocket = {

    socket : io.connect('http://' + document.domain + ':' + location.port,{transports: ['websocket']}),


    initConnectionEvent : function() {
        webSocket.socket.on('connect',function(){
            webSocket.socket.emit('connection','User has connected!')
        });
    },


    sendMove : function(element, source, target){
        let moveData = {element:element.id,source:source.id,target:target.id};
        webSocket.socket.emit('send_move',moveData);
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
    },


    initMoveEvent : function () {
        webSocket.socket.on('move',function(moveData) {
            webSocket.moveHandler(moveData);
        });
    },


    initWebSocket : function(){
        webSocket.initConnectionEvent();
        webSocket.initMoveEvent();
    },
};

