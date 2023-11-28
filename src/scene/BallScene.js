import { canvas, ctx } from "../main";
import { BaseScene } from "./BaseScene";
import { StartScene } from "./StartScene";

export class BallScene extends BaseScene {
    constructor(/** @type {StartScene} */ game) {
        super();
        this.game = game
        console.log("BallScene.INIT");
        this.ballRotationAngle = 0;
        this.direction = "positive";
        this.ballSize = 40
        /* ------------------------------ BALL PRELOAD ------------------------------ */
        this.ball = new Image()
        this.ball.src = "../../assets/img/ball.png"
        /* ------------------------------ BALL PRELOAD ------------------------------ */
    }
    draw() {
        ctx.save() //save deafult context (where ctx x and y = 0, not translated)
        ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
        ctx.rotate((this.ballRotationAngle * Math.PI) / 180)
        ctx.drawImage(
            this.ball,
            -this.ballSize / 2,
            -(this.game.backgroundScene.jupiterSize / 2) - 100,
            this.ballSize, this.ballSize)
        ctx.restore() //restore to deafult context
    }
    update() {
        this.ballRotationAngle === 360 && (this.ballRotationAngle = 0) //reset rotation after 360deg spin
        this.ballRotationAngle += 1 //rotate ball around jupiter
    }
}