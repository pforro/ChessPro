import {validation} from "../validation.js";


export let pawn = {


    pawnMoves: function (element, yCor, xCor) {
        let validMoves = [];
        let dir = (element.dataset.color === 'Black') ? 1 : -1;
        if (Number(element.dataset.steps) < 1) {
            validMoves = validation.mapValidMoves(yCor, xCor, dir, 0, 3);
        } else {
            validMoves = validation.mapValidMoves(yCor, xCor, dir, 0, 2);
        }
        let diagCell1 = document.querySelector(`.cell[data-ycor="${yCor + dir}"][data-xcor="${xCor + 1}"]`);
        let diagCell2 = document.querySelector(`.cell[data-ycor="${yCor + dir}"][data-xcor="${xCor - 1}"]`);


        if (diagCell1) {
            if (diagCell1.dataset.active === 'true') {
                validMoves = validMoves.concat([document.querySelector(`.cell[data-ycor="${yCor + dir}"][data-xcor="${xCor + 1}"]`)]);
            }
        }
        if (diagCell2) {
            if (diagCell2.dataset.active === 'true') {
                validMoves = validMoves.concat([document.querySelector(`.cell[data-ycor="${yCor + dir}"][data-xcor="${xCor - 1}"]`)]);
            }
        }
        document.validMoves = validMoves;
    }
};