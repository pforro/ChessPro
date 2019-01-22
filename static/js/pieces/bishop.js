import {validation} from "../validation.js";


export let bishop = {

    steps : [
        [-1, 1, 8], [1, 1, 8], [1, -1, 8], [-1, -1, 8]
    ],


    bishopMove : function(yCor, xCor) {
        document.validMoves = [];
        for(let step of bishop.steps) {
            document.validMoves = document.validMoves
                .concat(validation.mapValidMoves(yCor, xCor, step[0], step[1], step[2]));
        }
    }
};