// function initRefreshSocket() {
//     let socket = io.connect('http://' + document.domain + ':' + location.port,{transports: ['websocket']});
//     socket.on('connect',function(){
//         socket.emit('join','join');
//     });
//     socket.on('refresh',function(data){
//         location.reload();
//     });
// }

// function initPlayBtns(socket) {
//     let btns = document.querySelectorAll('.play');
//     btns.forEach(btn => btn.addEventListener('click',function(){
//         socket.emit('refresh','refresh');
//     }))
// }


// function initDeleteBtns(socket) {
//     let btns = document.querySelectorAll('.play');
//     btns.forEach(btn => btn.addEventListener('click',function(){
//         socket.emit('refresh','refresh');
//     }))
// }


function initNewGameButton(){
    let button = document.querySelector('#newgame');
    button.addEventListener('click',function(){
        $('#newgame-dialog').modal('show');
    })
}



function sendNewGameData(formData) {
    let options = {method:'POST',body:formData};
    fetch('http://' + document.domain + ':' + location.port + '/newgame',options)
        .then(response => response.json())
        .then(()=> location.reload());
}



function initSubmitModalBtn(){
    let button = document.querySelector("#submit-modal");
    button.addEventListener('click',function(){
        let name = document.querySelector("#input-name").value;
        let opponent = document.querySelector("#select-opponent").value;
        let color = document.querySelector("#select-color").value;
        let formData = new FormData();
        formData.append('board_name',name);
        formData.append('opponent_id',opponent);
        formData.append('color',color);
        sendNewGameData(formData);
        $('#newgame-dialog').modal('hide');
    })
}



function main(){
    initNewGameButton();
    initSubmitModalBtn();
}


main();