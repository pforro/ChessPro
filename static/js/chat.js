import {webSocket} from "./websocket.js";


export let chat = {

    initSubmitChat : function() {
        let submitBtn = document.querySelector('#submit-btn');
        submitBtn.addEventListener('click',function(){
            let input = document.querySelector('#chat-input');
            let usrname = document.querySelector('#chessboard').dataset.nickname;
            webSocket.sendChat(input.value,usrname);
            input.value = "";
        })
    }


};