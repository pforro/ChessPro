import {dom} from "./dom.js";
import {webSocket} from "./websocket.js";
import {dragndrop} from "./dragndrop.js";
import {chat} from "./chat.js";
import {validation} from "./validation.js";
import {timer} from "./timer.js";


function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dom.loadPieces();
    chat.initSubmitChat();
}


main();

