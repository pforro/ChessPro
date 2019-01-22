import {validation} from "./validation.js";
import {webSocket} from "./websocket.js";
import {dom} from "./dom.js"

export let dragndrop = {


    dragHandler: function (element) {
        if (element.dataset.color !== document.querySelector('#chessboard').dataset.color) {
            drake.cancel(true);
        } else {
            validation.moveValidation(element);
            dom.highlight();
        }
    },


    dropHandler: function (element, target, source) {
        if (!document.validMoves.includes(target)) {
            drake.cancel(true);
        } else {
            webSocket.sendMove(element, source, target);
        }
        dom.revertHighlight();
    },


    cancelHandler: function () {
        dom.revertHighlight();
    },


    dragulizeCells: function () {
        let cells = document.querySelectorAll('.cell');
        let drake = dragula(Array.from(cells));
        drake.on('drag', dragndrop.dragHandler);
        drake.on('drop', dragndrop.dropHandler);
        drake.on('cancel', dragndrop.cancelHandler);
    }

};