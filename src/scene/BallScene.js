import { canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

export class BallScene {
    constructor(/** @type {StartScene} */ game) {
        this.game = game
        console.log("BallScene.INIT");
        this.ballRotationAngle = 0; //rotation ball (on degree scale)
        this.direction = "positive" //direction of rotation (positive = clockwise, negative = counter-clockwise)
        this.ballSize = 40
        this.speed = 2.5
        /* ------------------------------ BALL PRELOAD ------------------------------ */
        this.ball = new Image()
        this.ball.src = "../../assets/img/ball.png"
        /* ------------------------------ BALL PRELOAD ------------------------------ */
    }
    draw() {
        ctx.save() //save deafult context (where ctx x and y = 0, not translated)
        ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
        ctx.rotate((this.ballRotationAngle * Math.PI) / 180) // rotate ball according to rotation angle and convert to radian
        ctx.drawImage(
            this.ball,
            -this.ballSize / 2,
            -(this.game.backgroundScene.jupiterSize / 2) - 80,
            this.ballSize, this.ballSize)
        ctx.restore() //restore to deafult context
    }
    update() {
        this.ballRotationAngle === 360 && (this.ballRotationAngle = 0) //reset rotation after 360deg spin
        this.ballRotationAngle < 0 && (this.ballRotationAngle = 360) //reset rotation when decreasing
        this.ballRotationAngle += this.direction === "positive" ? this.speed : -this.speed //rotate ball around jupiter
    }
}