import { canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

export class ScoreScene {
    constructor(/** @type {StartScene} */ game) {
        this.game = game;
        console.log("ScoreScene.INIT");
        this.highScore = localStorage.getItem("highScore") ?? null;
        this.highScoreTimeStamp = this.highScore
            ? new Date(parseInt(this.highScore) * 1000).toISOString().slice(11, 19)
            : null;
    }
    draw() {
        //on game done
        if (this.game.gameStatus === "WIN" || this.game.gameStatus === "GAMEOVER") {
            ctx.save() //save default context (where ctx x and y = 0, not translated)
            ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
            ctx.fillStyle = "#f5bf41";
            ctx.fillRect(-225, -150, 450, 300)
            ctx.fillStyle = "whitesmoke";
            ctx.textBaseline = "top"
            ctx.font = "32px Kdam Thmor Pro";
            ctx.fillText(`You ${this.game.gameStatus === "WIN" ? "Win" : "Lose"}`, 0, -100)
            ctx.fillText(
                `Your Score: ${this.game.timerScene.hour.toString().padStart(2, "0")}:${this.game.timerScene.minute.toString().padStart(2, "0")}:${this.game.timerScene.second.toString().padStart(2, "0")}`
                , 0, -40)
            ctx.fillText(`Click anywhere to restart`, 0, 80)
            ctx.font = "22px Kdam Thmor Pro";
            ctx.fillText(`Last High Score:`, 0, 0)
            ctx.fillText(`${this.highScoreTimeStamp ?? "NO HIGH SCORE YET"}`, 0, 30)
            ctx.restore() //restore context to last saved context (default context)
        }
    }
    update() {
        if (this.game.gameStatus === "WIN" || this.game.gameStatus === "GAMEOVER")
            return window.document.addEventListener("click", () => window.location.reload());
    }
}