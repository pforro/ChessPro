import {dom} from "./dom.js";
import {socketEvents} from "./socketEvents.js";
import {chat} from "./chat.js";


function main(){
    socketEvents.initWebSocket();
    dom.buildChessBoard();
    dom.loadPieces();
    chat.initSubmitChat();
    dom.initExitBtn();
}


main();

