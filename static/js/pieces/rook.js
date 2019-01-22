import {validation} from "../validation.js";



export let rook = {


    steps : [
        [-1, 0, 8], [0, 1, 8], [1, 0, 8], [0, -1, 8]
    ],


    rookMove : function(yCor, xCor) {
        document.validMoves = [];
        for(let step of rook.steps) {
            document.validMoves = document.validMoves
                .concat(validation.mapValidMoves(yCor, xCor, step[0], step[1], step[2]));
        }
    }
};