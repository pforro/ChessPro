import {validation} from "./validation.js";

export let chessPiece = {


    loadPieces: function(){
        fetch('http://localhost:5000/load_board',{method:'GET'})
            .then(response => response.json())
            .then(data => {
                data.pieces.forEach(piece => chessPiece.createPiece(piece));
                validation.trackPiecesInMatrix();
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