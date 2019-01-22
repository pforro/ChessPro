import {webSocket} from "./websocket.js";
import {queen} from "./pieces/queen.js";
import {king} from "./pieces/king.js";
import {rook} from "./pieces/rook.js";
import {bishop} from "./pieces/bishop.js";
import {knight} from "./pieces/knight.js";
import {pawn} from "./pieces/pawn.js";



export let validation = {

    showTurn : function(){
        let turn = document.querySelector('#turn');
        turn.textContent = validation.isYourTurn();
    },


    isYourTurn : function(){
        return document.querySelector('#chessboard').dataset.turn === 'true';
    },

    getOwnColor : function() {
       return document.querySelector('#chessboard').dataset.color;
    },


    isObstacleAhead : function(cell,step,color) {
        let obstacle = cell.firstElementChild;
        return  obstacle && step >=2 &&
                (obstacle.dataset.color === color || obstacle.dataset.type === 'King');
    },


    isEnemyAhead : function(cell,color){
        let enemy = cell.firstElementChild;
        return enemy && enemy.dataset.color !== color;
    },


    getCell : function (yCor, xCor) {
        return document.querySelector(`.cell[data-ycor="${yCor}"][data-xcor="${xCor}"]`);
    },


    mapValidMoves : function (yCor, xCor, yIncr, xIncr, maxStep) {
        let validMoves = [];
        let color = validation.getOwnColor();
        let step = 1;
        while (step <= maxStep) {
            let cell = validation.getCell(yCor,xCor);
            if(cell && !validation.isObstacleAhead(cell,step,color)){
                validMoves.push(cell);
                if(validation.isEnemyAhead(cell,color)) break;
                yCor += yIncr; xCor += xIncr; ++step;
            } else {
                break;
            }
        }
        return validMoves;
    },


    kill : function(target){
        let color = validation.getOwnColor();
        let enemyColor = (color === 'White') ? 'Black' : 'White';
        let enemy = target.querySelector(`.${enemyColor}`);
        if(enemy){
            webSocket.sendKill(enemy.id);
        }
    },


    moveValidation : function (element) {
        let type = element.dataset.type;
        let yCor=Number(element.parentElement.dataset.ycor);
        let xCor=Number(element.parentElement.dataset.xcor);
        switch (type) {
            case 'Queen':
                queen.queenMove(yCor, xCor);
                break;
            case 'King':
                king.kingMove(yCor, xCor);
                break;
            case 'Rook':
                rook.rookMove(yCor, xCor);
                break;
            case 'Bishop':
                bishop.bishopMove(yCor, xCor);
                break;
            case 'Pawn':
                pawn.pawnMoves(element, yCor, xCor);
                break;
            case 'Knight':
                knight.knightMove(yCor, xCor);
                break;
        }
    }
};