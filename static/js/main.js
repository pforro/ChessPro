import {webSocket} from "./websocket.js";
import {chessPiece} from "./chesspiece.js";
import {dom} from "./dom.js";


function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dom.dragulizeCells();
    chessPiece.loadPieces();
}

main();