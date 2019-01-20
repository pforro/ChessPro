import {webSocket} from "./websocket.js";


export let dom = {


    createChessBoardCell : function(cellId, yCor, xCor){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('col');
        cell.id = 'cell' + cellId;
        cell.dataset.ycor = yCor+1;
        cell.dataset.xcor = xCor+1;
        cell.style.backgroundColor = ((xCor+yCor)% 2 === 0 ) ? '#844A28' : 'lightgrey';
        return cell
    },


    buildChessBoard : function(){
        let chessboard = document.querySelector('#chessboard');
        let cellId = 1;
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




};



