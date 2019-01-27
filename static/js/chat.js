import {socketEvents} from "./socket_events.js";


export let chat = {

    input :  document.querySelector('#chat-input'),

    usrname : document.querySelector('#chessboard').dataset.username,

    submitBtn : document.querySelector('#submit-btn'),

    body :  document.querySelector('body'),

    chat : document.querySelector('#chat'),


    sendChatMessage : function() {
        if(chat.input.value) {
            socketEvents.sendChatMessage(chat.input.value, chat.usrname);
            chat.input.value = "";
        }
    },


    initSubmitChat : function() {
        chat.submitBtn.addEventListener('click',chat.sendChatMessage);
        chat.body.addEventListener('keydown',function(event){
            if (event.key === 'Enter') chat.sendChatMessage();
        });
    },


    autoMessage : function(message) {
        chat.chat.innerHTML += `<p><i style="color:#00B446;">System: ${message}</i></p>`;
        chat.chat.scrollTop = chat.chat.scrollHeight;
    }


};