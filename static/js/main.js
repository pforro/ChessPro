import {dom} from "./dom.js";
import {webSocket} from "./websocket.js";
import {dragndrop} from "./dragndrop.js";
import {chat} from "./chat.js";
import {validation} from "./validation.js";



function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dragndrop.initDragndrop();
    dom.loadPieces();
    chat.initSubmitChat();
    // validation.showTurn();
}


main();

