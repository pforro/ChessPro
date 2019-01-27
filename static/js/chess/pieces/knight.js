import {gameControl} from "../game_control.js";


export let knight = {

    steps : [
        [-2, 1, 2], [-1, 2, 2], [1, 2, 2], [2, 1, 2],
        [2, -1, 2], [1, -2, 2], [-1, -2, 2], [-2  , -1, 2],
    ],


    knightMove : function(yCor, xCor) {
        document.validMoves = [];
        for(let step of knight.steps) {
            document.validMoves = document.validMoves
                .concat(gameControl.mapValidMoves(yCor, xCor, step[0], step[1], step[2]));
        }
    }
};
