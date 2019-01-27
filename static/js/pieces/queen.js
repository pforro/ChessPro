import {gameControl} from "../game_control.js";


export let queen = {

    steps : [
        [-1, 0, 8], [-1, 1, 8], [0, 1, 8], [1, 1, 8],
        [1, 0, 8], [1, -1, 8], [0, -1, 8], [-1, -1, 8]
    ],


    queenMove : function(yCor, xCor) {
        document.validMoves = [];
        for(let step of queen.steps) {
            document.validMoves = document.validMoves
                .concat(gameControl.mapValidMoves(yCor, xCor, step[0], step[1], step[2]));
        }
    }
};