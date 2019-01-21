
export let validation = {

    trackPiecesInMatrix : function () {
        let cells = document.querySelectorAll('.cell');
        let index = 0, matrix = [];
        for(let i=0; i<8; ++i){
            let tmp = [];
            for(let j=0; j<8; ++j){
                if(cells[index].firstElementChild) {
                    let color = cells[index].firstElementChild.dataset.color;
                    let type = cells[index].firstElementChild.dataset.type;
                    tmp.push([color, type]);
                } else {
                    tmp.push('');
                }
                ++index;
            }
            matrix.push(tmp);
        }
        document.matrix = matrix;
    },


    validDiagonalMoves : function (yCor, xCor) {
        let y = yCor;
        let x = xCor;
        let validMoves = [];
        while(yCor<8 && xCor<8){
            if(document.matrix[yCor][xCor] === ""){
                validMoves.push(document.matrix[yCor][xCor]);
            }
            yCor++;
            xCor++;
        }
        yCor = y;
        xCor = x;
        while(yCor<8 && xCor>0) {
            if (document.matrix[yCor][xCor] === "") {
                validMoves.push([yCor, xCor]);
            }
            yCor++;
            xCor--;
        }
        yCor = y;
        xCor = x;
        while(yCor>0 && xCor>0) {
            if (document.matrix[yCor][xCor] === "") {
                validMoves.push([yCor, xCor]);
            }
            yCor--;
            xCor--;
        }
        yCor = y;
        xCor = x;
        while(yCor>0 && xCor<8) {
            if (document.matrix[yCor][xCor] === "") {
                validMoves.push([yCor, xCor]);
            }
            yCor--;
            xCor++;
        }
        console.log(validMoves);
    }

    // function mov

};