import {dom} from "./dom.js";
import {socketEvents} from "./socket_events.js";
import {chat} from "./chat.js";


function main(){
    socketEvents.initSocketEvents();
    dom.buildChessBoard();
    dom.loadPieces();
    chat.initSubmitChat();
    dom.initExitBtn();
}


main();

