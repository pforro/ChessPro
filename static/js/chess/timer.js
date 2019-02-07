import {socketEvents} from "./socket_events.js";

class Timer{
    constructor(){
            this.time = {m:1,s:0};
            this.default = {m:1,s:0};
            this.hsTime = 6000;
            this.active = false;
            this.id = null;      

            this.tick = ()=>{
                this.time.s -= 1;
                if(this.time.s === -1){
                    this.time.s = 59;
                    this.time.m -= 1;
                }
                this.displayTime();
                this.setBgcolor();
                if(this.timeConverter()===0){
                        this.reset();
                        socketEvents.sendTimeOut();
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
                this.setBgcolor();
                this.displayTime();
            };


            this.timeConverter = ()=>{
                return 6000*this.time.m + 100*this.time.s;
            };


            this.setBgcolor = ()=>{
                let recentTime = this.timeConverter();
                let body = document.querySelector("body");
                if(recentTime === this.hsTime || recentTime === 0){
                    body.style.backgroundColor = "lightgray";
                } else if(recentTime > this.hsTime*(2/3)){
                    body.style.backgroundColor = "#00B453";
                } else if(recentTime > this.hsTime*(1/3)){
                    body.style.backgroundColor = "#FAC300";
                } else if(recentTime > 0){
                    body.style.backgroundColor = "#F21A2B";
                }
            };
            this.displayTime();
        }
}

function numFormat(number){
    return (number>9) ? number : "0" + number;
}


export let timer = new Timer();

