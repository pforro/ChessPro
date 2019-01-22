import {validation} from "../validation.js";



export let king = {


    steps : [
        [-1, 0, 2], [-1, 1, 2], [0, 1, 2], [1, 1, 2],
        [1, 0, 2], [1, -1, 2], [0, -1, 2], [-1, -1, 2]
    ],


    kingMove : function(yCor, xCor) {
        document.validMoves = [];
        for(let step of king.steps) {
            document.validMoves = document.validMoves
                .concat(validation.mapValidMoves(yCor, xCor, step[0], step[1], step[2]));
        }
    }
};