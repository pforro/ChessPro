import {validation} from "./validation.js";
import {dom} from "./dom.js";

export let chessPiece = {

    baseURL: 'http://' + document.domain + ':' + location.port + '/load_board',

    loadPieces: function(){
        fetch(chessPiece.baseURL,{method:'GET',mode:'no-cors'})
            .then(response => response.json())
            .then(data => {
                //data.pieces.forEach(piece => chessPiece.createPiece(piece));
                dom.rotateBoard();
                validation.trackPiecesInMatrix();
                validation.mapDiagonalMoves(4, 4, -1, 1)
            })
    },


    createPiece : function (piece) {
        let chessBoardCell = document.querySelector('#' + piece.cellid);
        let img = document.createElement('img');
        img.setAttribute('src',`static/pics/${piece.color}${piece.type}.png`);
        img.className = `piece ${piece.color} ${piece.type}`;
        img.dataset.type = piece.type;
        img.dataset.color = piece.color;
        img.id = piece.id;
        chessBoardCell.appendChild(img);
    },
};