
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
        let validMoves = [];
        switch (type) {
            case 'Queen':
                validMoves = validation.mapValidMoves(yCor, xCor, -1, 0, 8);
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, -1, 1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, 1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 0, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, -1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, -1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, -1, -1, 8));
                document.validMoves = validMoves;
                break;

            case 'King':
                validMoves = validation.mapValidMoves(yCor, xCor, -1, 0, 2);
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, -1, 1, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, 1, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 1, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 0, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, -1, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, -1, 2));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, -1, -1, 2));
                document.validMoves = validMoves;
                break;

            case 'Rook':
                validMoves = validation.mapValidMoves(yCor, xCor, -1, 0, 8);
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, 1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 0, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 0, -1, 8));
                document.validMoves = validMoves;
                break;


            case 'Bishop':
                validMoves = validation.mapValidMoves(yCor, xCor, -1, 1, 8);
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, 1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, 1, -1, 8));
                validMoves = validMoves.concat(validation.mapValidMoves(yCor, xCor, -1, -1, 8));
                document.validMoves = validMoves;
                break;
        }
    }

};