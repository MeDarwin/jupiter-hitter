import { canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

export class BackgroundScene {
    constructor(/** @type {StartScene} */game) {
        this.game = game
        console.log("BackgroundScene.INIT");
        this.jupiterSize = 390
        this.jupiterRotationAngle = 0
        /* ------------------------------ ASSETS PRELOAD ----------------------------- */
        this.jupiterPng = new Image();
        this.jupiterPng.src = "../../assets/img/jupiter.png";
        this.bgMusic = new Audio();
        this.bgMusic.src = "../../assets/audio/bg.mp3";
        this.bgMusic.loop = true
        /* ------------------------------ ASSETS PRELOAD ----------------------------- */
    }
    draw() {
        ctx.save() //save default context (where ctx x and y = 0, not translated)
        ctx.translate((canvas.clientWidth / 2), (canvas.clientHeight / 2)) //translate to center
        ctx.rotate((this.jupiterRotationAngle * Math.PI) / 180) //rotate jupiter according to jupiter rotation angle
        ctx.drawImage(
            this.jupiterPng,
            -this.jupiterSize / 2, //X direction target (negative value as we're moving left)
            -this.jupiterSize / 2, //Y direction target (negative value as we're moving up)
            this.jupiterSize, this.jupiterSize) // target size (width, height)
        ctx.restore() //restore context to last saved context (default context)
    }
    update() {
        this.game.isMute && this.bgMusic.pause()
        !this.game.isMute && this.bgMusic.play()
        this.jupiterRotationAngle === 360 && (this.jupiterRotationAngle = 0) //reset rotation after 360deg spin
        this.jupiterRotationAngle += .1 //rotate jupiter
    }
    stopBgMusic() {
        this.bgMusic.pause()
    }
    startBgMusic() {
        this.bgMusic.play()
    }
}