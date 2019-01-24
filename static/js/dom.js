import {webSocket} from "./websocket.js";
import {validation} from "./validation.js";


export let dom = {


    createChessBoardCell : function(cellId, yCor, xCor){
        let cell = document.createElement('div');
        cell.className = 'cell col container';
        cell.id = 'cell' + cellId;
        cell.dataset.ycor = yCor;
        cell.dataset.xcor = xCor;
        cell.dataset.active = false;
        cell.style.backgroundColor = ((xCor+yCor)% 2 === 0 ) ? '#606060' : 'lightgrey';
        return cell
    },


    buildChessBoard : function(){
        let chessboard = document.querySelector('#chessboard');
        let cellId = 0;
        for(let yCor=0;yCor<8;++yCor){
            let row = document.createElement('div');
            row.classList.add('row');
            for(let xCor=0;xCor<8;++xCor){
                let cell = dom.createChessBoardCell(cellId, yCor, xCor);
                ++cellId;
                row.appendChild(cell);
            }
            chessboard.appendChild(row);
        }
    },


    highlight : function() {
        document.validMoves.forEach(cell => cell.style.backgroundImage = `url("/static/pics/highlight.jpg")` );
    },


    revertHighlight : function() {
        document.validMoves.forEach(cell => cell.style.backgroundImage = `none`);
    },


    rotateBoard : function(){
        let chessBoard = document.querySelector('#chessboard');
        if(chessBoard.dataset.color === 'Black'){
            chessBoard.style.transform = 'rotate(180deg)';
            document.querySelectorAll('.piece').forEach(piece => piece.style.transform='rotate(180deg)');
        }
    },


    loadPieces: function(){
        let formData = new FormData();
        let boardName = document.querySelector('#chessboard').dataset.boardname;
        formData.append('board_name',boardName);
        let baseURL = 'http://' + document.domain + ':' + location.port + '/load_board';
        fetch(baseURL,{method:'POST',body:formData})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.pieces.forEach(piece => dom.createPiece(piece));
                dom.rotateBoard();
            })
    },


    createPiece : function (piece) {
        let chessBoardCell = document.querySelector('#' + piece.cellid);
        let img = document.createElement('img');
        img.setAttribute('src',`/static/pics/${piece.color}${piece.type}.png`);
        img.className = `piece ${piece.color} ${piece.type}`;
        img.dataset.type = piece.type;
        img.dataset.color = piece.color;
        img.dataset.steps = 0;
        img.id = piece.id;
        chessBoardCell.appendChild(img);
        chessBoardCell.dataset.active = true;
    },
};



