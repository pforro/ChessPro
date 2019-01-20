

export let chessPiece = {

    backPieceRow : [
        {type:'Rook', no:1},
        {type:'Knight', no:1},
        {type:'Bishop', no:1},
        {type:'Queen', no:1},
        {type:'King', no:1},
        {type:'Bishop' , no:2},
        {type:'Knight', no:2},
        {type:'Rook', no:2},
    ],


    frontPieceRow : [
        {type:'Pawn', no:1},
        {type:'Pawn', no:2},
        {type:'Pawn', no:3},
        {type:'Pawn', no:4},
        {type:'Pawn', no:5},
        {type:'Pawn', no:6},
        {type:'Pawn', no:7},
        {type:'Pawn', no:8}
    ],


    createPiece : function (iterator,color,piece) {
        let chessBoardCell = document.querySelector('#cell' + iterator);
        let img = document.createElement('img');
        img.setAttribute('src',`static/pics/${color}${piece.type}.png`);
        img.className = `piece ${color} ${piece.type}`;
        img.dataset.type = piece.type;
        img.dataset.color = color;
        img.id = color + piece.type + piece.no;
        chessBoardCell.appendChild(img);
    },


    populateBlackPieces : function() {
        for(let i=1; i<=8; ++i) {
            chessPiece.createPiece(i, 'Black', chessPiece.backPieceRow[i-1]);
            chessPiece.createPiece(i+8, 'Black', chessPiece.frontPieceRow[i-1]);
        }
    },


    populateWhitePieces : function(){
        for(let i=64;i>=57;--i){
            chessPiece.createPiece(i,'White',chessPiece.backPieceRow[64-i]);
            chessPiece.createPiece(i-8,'White',chessPiece.frontPieceRow[64-i]);
        }
    },


    populateChessBoard : function () {
        chessPiece.populateBlackPieces();
        chessPiece.populateWhitePieces();
    }
};