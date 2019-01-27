import {dom} from "./dom.js";
import {socketEvents} from "./socket_events.js";
import {chat} from "./chat.js";


function main(){
    socketEvents.initSocketEvents();
    dom.initDom();
    chat.initSubmitChat();
}


main();

