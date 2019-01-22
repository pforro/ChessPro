import {queen} from "./pieces/queen.js";
import {king} from "./pieces/king.js";
import {rook} from "./pieces/rook.js";
import {bishop} from "./pieces/bishop.js";
import {knight} from "./pieces/knight.js";
import {pawn} from "./pieces/pawn.js";


export let validation = {

    mapValidMoves : function (yCor, xCor, yIncr, xIncr, maxStep) {
        let validMoves = [];
        let step = 1;
        while (step++ <= maxStep) {
            let cell = document.querySelector(`.cell[data-ycor="${yCor}"][data-xcor="${xCor}"]`);
            if(cell){
                validMoves.push(cell);
            }
            yCor += yIncr; xCor += xIncr;
        }
        return validMoves;
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