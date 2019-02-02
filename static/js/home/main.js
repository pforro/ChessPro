import {home} from "./home.js";


function main(){
    home.initSocketEvents();
    home.initNewGameButton();
    home.initSubmitModalBtn();
    home.loadGamesOnStartup();
    home.initDeleteGameButton();
}


main();