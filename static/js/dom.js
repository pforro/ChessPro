import {webSocket} from "./websocket.js";


export let dom = {


    createChessBoardCell : function(cellId, yCor, xCor){
        let cell = document.createElement('div');
        cell.className = 'cell col container';
        cell.id = 'cell' + cellId;
        cell.dataset.ycor = yCor;
        cell.dataset.xcor = xCor;
        cell.style.backgroundColor = ((xCor+yCor)% 2 === 0 ) ? '#844A28' : 'lightgrey';
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


    dragulizeCells : function(){
        let cells = document.querySelectorAll('.cell');
        let drake = dragula(Array.from(cells));
        drake.on('drop',function(element,target,source){
            webSocket.sendMove(element,source,target);
        })
    },


    rotateBoard : function(){
        let chessBoard = document.querySelector('#chessboard');
        if(chessBoard.dataset.color === 'black'){
            chessBoard.style.transform = 'rotate(180deg)';
            document.querySelectorAll('.piece').forEach(piece=>piece.style.transform='rotate(180deg)');
        }
    }
};



