
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

    mapValidMovesPawn : function (element) {
        let validMoves = [];
        let dir = (element.dataset.color === 'Black') ? 1 : -1;
        let yCor = Number(element.parentElement.dataset.ycor);
        let xCor = Number(element.parentElement.dataset.xcor);
        if(Number(element.dataset.steps) < 1){
            validMoves = validation.mapValidMoves(yCor, xCor, dir, 0, 3);
        } else {
            validMoves = validation.mapValidMoves(yCor, xCor, dir, 0, 2);
        }
        let diagCell1 = document.querySelector(`.cell[data-ycor="${yCor+dir}"][data-xcor="${xCor+1}"]`);
        let diagCell2 = document.querySelector(`.cell[data-ycor="${yCor+dir}"][data-xcor="${xCor-1}"]`);


        if(diagCell1){
            if(diagCell1.dataset.active === 'true'){
                validMoves = validMoves.concat([document.querySelector(`.cell[data-ycor="${yCor + dir}"][data-xcor="${xCor + 1}"]`)]);
            }
        }
        if(diagCell2){
            if(diagCell2.dataset.active === 'true'){
                validMoves = validMoves.concat([document.querySelector(`.cell[data-ycor="${yCor+dir}"][data-xcor="${xCor-1}"]`)]);
            }
        }
        document.validMoves = validMoves;




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

            case 'Pawn':
                validation.mapValidMovesPawn(element);
                break;
        }
    }

};