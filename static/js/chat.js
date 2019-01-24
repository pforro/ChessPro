import {webSocket} from "./websocket.js";


export let chat = {

    sendChatMessage : function() {
        let input = document.querySelector('#chat-input');
        let usrname = document.querySelector('#chessboard').dataset.nickname;
        if(input.value) {
            webSocket.sendChat(input.value, usrname);
            input.value = "";
        }
    },

    initSubmitChat : function() {
        document.querySelector('#submit-btn').addEventListener('click',chat.sendChatMessage);
        document.querySelector('body').addEventListener('keydown',function(event){
            if (event.key === 'Enter') chat.sendChatMessage();
        });
    }


};