import {validation} from "./validation.js";
import {webSocket} from "./websocket.js";
import {dom} from "./dom.js"



export let dragndrop = {


    initDragndrop : function(){
        let cells = document.querySelectorAll('.cell');
        document.drake = dragula(Array.from(cells));
        document.drake.on('drag', dragndrop.dragHandler);
        document.drake.on('drop', dragndrop.dropHandler);
        document.drake.on('cancel', dragndrop.cancelHandler);
    },


    dragHandler: function (element) {
        if (element.dataset.color !== document.querySelector('#chessboard').dataset.color) {
            document.drake.cancel(true);
        } else {
            validation.moveValidation(element);
            dom.highlight();
        }
    },


    dropHandler: function (element, target, source) {
        if (!document.validMoves.includes(target)) {
            document.drake.cancel(true);
        } else {
            webSocket.sendMove(element, source, target);
            dom.revertHighlight();
        }
    },


    cancelHandler: function (element) {
        if (element.dataset.color === document.querySelector('#chessboard').dataset.color) {
            dom.revertHighlight();
        }
    },
};