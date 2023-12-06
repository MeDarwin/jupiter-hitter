import { canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

export class TimerScene {
    constructor(/** @type {StartScene} */ game) {
        this.game = game
        console.log("TimerScene.INIT");
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.timer;
    }
    draw() {
        ctx.fillStyle = "whitesmoke";
        ctx.textBaseline = "top"
        ctx.font = "22px Kdam Thmor Pro";
        ctx.save() //save default context (where ctx x and y = 0, not translated)
        ctx.translate((canvas.clientWidth / 2), 10) //translate to center
        ctx.fillText(`${this.hour.toString().padStart(2, "0")}:${this.minute.toString().padStart(2, "0")}:${this.second.toString().padStart(2, "0")}`, 0, 0)
        ctx.restore() //restore context to last saved context (default context)
    }
    startTimer() {
        this.timer = setInterval(() => {
            if (this.game.gameStatus !== "GAME") {
                const currentScore = (this.hour * 3600) + (this.minute * 60) + this.second //get the highest score
                const hiscore = Math.max(localStorage.getItem("highScore") ?? 0, currentScore) //store the highest
                if (currentScore > localStorage.getItem("highScore")) {
                    localStorage.setItem("highScore", hiscore); //store high score (in second)
                    localStorage.setItem("hours", this.hour)
                    localStorage.setItem("minutes", this.minute)
                    localStorage.setItem("seconds", this.second)
                }
                return clearInterval(this.timer);
            }
            this.second++;
            if (this.second === 60) {
                this.second = 0;
                this.minute++;
            }
            if (this.minute === 60) {
                this.minute = 0;
                this.hour++;
            }
        }, 1000);
    }
}