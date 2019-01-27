import {gameControl} from "./game_control.js";
import {socketEvents} from "./socket_events.js";
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
            if (gameControl.isYourTurn()){
                if (element.dataset.color !== gameControl.getOwnColor()) {
                    drake.cancel();
                } else {
                    gameControl.moveValidation(element);
                    dom.highlight();
                }
            } else {
                drake.cancel();
            }
        });
    },



    dropHandler : function(drake) {
        drake.on('drop', function(element,target,source){
            if (gameControl.isYourTurn()){
                if (!document.validMoves.includes(target)) {
                    drake.cancel(true);
                } else {
                    gameControl.kill(target);
                    socketEvents.sendMove(element, source, target);
                    dom.revertHighlight();
                }
            }
        });
    },



    cancelHandler : function(drake) {
        drake.on('cancel', function(element){
            if (element.dataset.color === gameControl.getOwnColor() && gameControl.isYourTurn()) {
                dom.revertHighlight();
            }
        });
    },

};