import {webSocket} from "./websocket.js";
import {chessPiece} from "./chesspiece.js";
import {dom} from "./dom.js";


function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dom.dragulizeCells();
    chessPiece.populateChessBoard();
    dom.rotateBoard();
}

main();