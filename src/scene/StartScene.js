import { canvas, ctx } from "../main";
import { BackgroundScene } from "./BackgroundScene";
import { BallScene } from "./BallScene";
import { BotScene, PlayerScene } from "./CharacterScene";

export class StartScene {
  constructor() {
    console.log("StartScene.INIT");
    this.assignNumber = []
    this.randNumGenerate = () => Math.floor(Math.random() * 4 + 1)
    for (let i = 1; i <= 4; i++) {
        let randomNumber = this.randNumGenerate()
      while (this.assignNumber.includes(randomNumber)) {
        randomNumber = this.randNumGenerate()
      }
      this.assignNumber.push(randomNumber)
    }
    /** @type {"DEV"|"PROD"}*/this.staging = "PROD"
    /* --------------------------------- BG GRAD -------------------------------- */
    this.blueColor = 'rgba(5, 2, 55, 1)';
    this.purpleColor = 'rgba(67, 11, 76, 1)';
    this.background = ctx.createLinearGradient(200, 600, 200, 0);
    this.background.addColorStop(1, this.blueColor);
    this.background.addColorStop(0, this.purpleColor);
    /* --------------------------------- BG GRAD -------------------------------- */
    this.backgroundScene = new BackgroundScene(this);
    this.ballScene = new BallScene(this)
    this.playerScene = new PlayerScene(this, this.assignNumber[0])
    this.bot1 = new BotScene(this, this.assignNumber[1], 1)
    this.bot2 = new BotScene(this, this.assignNumber[2], 2)
    this.bot3 = new BotScene(this, this.assignNumber[3], 3)
  }
  /**
   * Register all scene draw below 
   * @return {void} This function does not return any value.
   */
  draw() {
    ctx.fillStyle = this.background //gradient style
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight) //draw bg grad
    this.playerScene.isAlive && this.playerScene.draw()
    this.bot1.isAlive && this.bot1.draw()
    this.bot2.isAlive && this.bot2.draw()
    this.bot3.isAlive && this.bot3.draw()
    this.backgroundScene.draw()
    this.ballScene.draw()
    /* ------------------------------- CENTER AXIS ------------------------------- */
    if (this.staging === "DEV") {
      this.playerScene.isAlive && this.playerScene.debug()
      this.bot1.isAlive && this.bot1.debug()
      this.bot2.isAlive && this.bot2.debug()
      this.bot3.isAlive && this.bot3.debug()
      this.backgroundScene.debug()
      this.ballScene.debug()
      ctx.beginPath()
      ctx.strokeStyle = 'green'
      ctx.lineTo(canvas.clientWidth / 2, 0);
      ctx.lineTo(canvas.clientWidth / 2, canvas.clientHeight);
      ctx.stroke()
      ctx.beginPath()
      ctx.lineTo(0, canvas.clientHeight / 2);
      ctx.lineTo(canvas.clientWidth, canvas.clientHeight / 2);
      ctx.stroke()
    }
    /* ------------------------------- CENTER AXIS ------------------------------- */
  }
  /**
   * Register all scene update below 
   * @return {void} This function does not return any value.
   */
  update() {
    this.backgroundScene.update()
    this.ballScene.update()
    this.playerScene.isAlive && this.playerScene.update()
    this.bot1.isAlive && this.bot1.update()
    this.bot2.isAlive && this.bot2.update()
    this.bot3.isAlive && this.bot3.update()
  }
}

export const startScene = new StartScene(canvas.clientWidth, canvas.clientHeight); //INIT SCENE
