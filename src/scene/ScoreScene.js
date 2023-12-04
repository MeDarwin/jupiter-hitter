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
        //on game over (lose)
        if (this.game.gameStatus === "GAMEOVER") {
            ctx.save() //save default context (where ctx x and y = 0, not translated)
            ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
            ctx.fillStyle = "#f5bf41";
            ctx.fillRect(-225, -150, 450, 300)
            ctx.fillStyle = "whitesmoke";
            ctx.textBaseline = "top"
            ctx.font = "32px Kdam Thmor Pro";
            ctx.fillText(`You Lose`, 0, -100)
            ctx.font = "22px Kdam Thmor Pro";
            ctx.fillText(`High Score:`, 0, 0)
            ctx.fillText(`${this.highScoreTimeStamp ?? "NO HIGH SCORE YET"}`, 0, 30)
            ctx.restore() //restore context to last saved context (default context)
        }
    }
    update() { }
}