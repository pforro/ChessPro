import {dom} from "./dom.js";
import {webSocket} from "./websocket.js";
import {dragndrop} from "./dragndrop.js";
import {validation} from "./validation.js";



function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dragndrop.initDragndrop();
    dom.loadPieces();
    // validation.showTurn();
}


main();

