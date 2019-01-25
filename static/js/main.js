import {dom} from "./dom.js";
import {webSocket} from "./websocket.js";
import {chat} from "./chat.js";


function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dom.loadPieces();
    chat.initSubmitChat();
    dom.initExitBtn();
}


main();

