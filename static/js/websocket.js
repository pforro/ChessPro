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
        piece.remove();
        let targetCell = document.querySelector("#" + moveData.target);
        targetCell.appendChild(clone);
        //validation.trackPiecesInMatrix();

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

