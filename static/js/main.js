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




// dragulize és egyéb event handlereknek kéne csinálni egy abszolút külön dragndrop.js file-t
// switch case-s baszást külön fileba tenni mondjuk chesscontrol néven
// pieces mapping függvényeket akár külön almappáb kitenni és azon belül is filokra szétszedni
// websocket-ot átnevezni mondjuk socket-events-re
// lekezelni az útban álló saját színű bábukat
// leütés kezelése