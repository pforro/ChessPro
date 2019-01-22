import {validation} from "./validation.js";
import {webSocket} from "./websocket.js";
import {dom} from "./dom.js"



export let dragndrop = {

    initDragndrop : function(){
        let cells = document.querySelectorAll('.cell');
        let drake = dragula(Array.from(cells));
        dragndrop.dragHandler(drake);
        dragndrop.dropHandler(drake);
        dragndrop.cancelHandler(drake);
    },


    dragHandler : function(drake) {
        drake.on('drag', function(element){
            if (element.dataset.color !== document.querySelector('#chessboard').dataset.color) {
                drake.cancel(true);
            } else {
                validation.moveValidation(element);
                dom.highlight();
            }});
    },


    dropHandler : function(drake) {
        drake.on('drop', function(element,target,source){
            if (!document.validMoves.includes(target)) {
                drake.cancel(true);
            } else {
                webSocket.sendMove(element, source, target);
                dom.revertHighlight();
            }
        });
    },


    cancelHandler : function(drake) {
        drake.on('cancel', function(element){
            if (element.dataset.color === document.querySelector('#chessboard').dataset.color) {
                dom.revertHighlight();
            }
        });
    },



    // dragHandler: function (element) {
    //     if (element.dataset.color !== document.querySelector('#chessboard').dataset.color) {
    //         drake.cancel(true);
    //     } else {
    //         validation.moveValidation(element);
    //         dom.highlight();
    //     }
    // },


    // dropHandler: function (element, target, source) {
    //     if (!document.validMoves.includes(target)) {
    //         drake.cancel(true);
    //     } else {
    //         webSocket.sendMove(element, source, target);
    //         dom.revertHighlight();
    //     }
    // },


    // cancelHandler: function (element) {
    //     if (element.dataset.color === document.querySelector('#chessboard').dataset.color) {
    //         dom.revertHighlight();
    //     }
    // },
};