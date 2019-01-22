import {dom} from "./dom.js";
import {webSocket} from "./websocket.js";
import {dragndrop} from "./dragndrop.js";



function main(){
    webSocket.initWebSocket();
    dom.buildChessBoard();
    dragndrop.initDragndrop();
    dom.loadPieces();
}


main();



// websocket-ot átnevezni mondjuk socket-events-re
// lekezelni az útban álló saját színű bábukat
// leütés kezelése