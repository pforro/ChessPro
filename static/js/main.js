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



// chesspiece teljes tartalma mehetne át a domba
// dragulize és egyéb event handlereknek kéne csinálni egy abszolút külön dragndrop.js file-t
// switch case-s baszást külön fileba tenni mondjuk chesscontrol néven
// pieces mapping függvényeket akár külön almappáb kitenni és azon belül is filokra szétszedni
// websocket-ot átnevezni mondjuk socket-events-re
// lekezelni az útban álló saját színű bábukat
// leütés kezelése