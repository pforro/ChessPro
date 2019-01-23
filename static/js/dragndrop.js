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
            if (validation.isYourTurn()){
                if (element.dataset.color !== validation.getOwnColor()) {
                    drake.cancel();
                } else {
                    validation.moveValidation(element);
                    dom.highlight();
                }
            } else {
                drake.cancel();
            }
        });
    },


    dropHandler : function(drake) {
        drake.on('drop', function(element,target,source){
            if (validation.isYourTurn()){
                if (!document.validMoves.includes(target)) {
                    drake.cancel(true);
                } else {
                    validation.kill(target);
                    webSocket.sendMove(element, source, target);
                    dom.revertHighlight();
                }
            }
        });
    },


    cancelHandler : function(drake) {
        drake.on('cancel', function(element){
            if (element.dataset.color === validation.getOwnColor() && validation.isYourTurn()) {
                dom.revertHighlight();
            }
        });
    },

};