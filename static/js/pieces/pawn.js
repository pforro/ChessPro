import {validation} from "../validation.js";


export let pawn = {


    mapForwardMoves : function(element, direction, yCor, xCor){
        if (Number(element.dataset.steps) < 1) {
            document.validMoves = document.validMoves
                .concat(validation.mapValidMoves(yCor, xCor, direction, 0, 3));
        } else {
            document.validMoves = document.validMoves
                .concat(validation.mapValidMoves(yCor, xCor, direction, 0, 2));
        }
    },


    mapFrontObstacle : function() {
        if(document.validMoves[1].firstElementChild){
            document.validMoves.splice(1,1);
        }
    },


    getDiagonalCell : function(yCor, xCor, direction, xIncr) {
        return document.querySelector(`.cell[data-ycor="${yCor + direction}"][data-xcor="${xCor + xIncr}"]`)
    },


    mapDiagonalMoves : function(yCor, xCor, direction) {
        let diagCellLeft = pawn.getDiagonalCell(yCor,xCor,direction,-1);
        let diagCellRight = pawn.getDiagonalCell(yCor,xCor,direction,1);
        if (diagCellLeft && diagCellLeft.dataset.active === 'true') {
            document.validMoves.push(diagCellLeft);
        }
        if (diagCellRight && diagCellRight.dataset.active === 'true') {
            document.validMoves.push(diagCellRight);
        }
    },


    pawnMoves: function (element, yCor, xCor) {
        document.validMoves = [];
        let direction = (element.dataset.color === 'Black') ? 1 : -1;
        pawn.mapForwardMoves(element, direction, yCor, xCor);
        pawn.mapFrontObstacle();
        pawn.mapDiagonalMoves(yCor,xCor,direction);
    }
};