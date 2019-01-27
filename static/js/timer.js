import {socketEvents} from "./socketEvents.js";

class Timer{
    constructor(){
            this.time = {m:1,s:0};
            this.default = {m:1,s:0};
            this.active = false;
            this.id = null;      

            this.tick = ()=>{
                this.time.s -= 1;
                if(this.time.s === -1){
                    this.time.s = 59;
                    this.time.m -= 1;
                }
                this.displayTime();
                if(this.timeConverter()===0){
                        this.reset();
                        socketEvents.timeOut();
                }
            };


            this.displayTime = ()=>{
                document.querySelector("#time").textContent = 
                    `${numFormat(this.time.m)}:${numFormat(this.time.s)}`;
            };


            this.startTimer = ()=>{
                if(!this.active){
                    this.active = true;
                    this.id = setInterval(this.tick,1000);
                }
            };


            this.stop = ()=>{
                if(this.active){
                    clearInterval(this.id);
                    this.active = false;
                }
            };


            this.reset = ()=>{
                this.stop();
                this.time = JSON.parse(JSON.stringify(this.default));
                this.displayTime();
            };


            this.timeConverter = ()=>{
                return 6000*this.time.m + 100*this.time.s;
            };
            this.displayTime();
        }
}

function numFormat(number){
    return (number>9) ? number : "0" + number;
}


export let timer = new Timer();

