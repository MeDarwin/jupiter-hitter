import { canvas, ctx } from "../main";
import { BackgroundScene } from "./BackgroundScene";
import { BallScene } from "./BallScene";
import { CharacterScene, PlayerScene } from "./CharacterScene";

export class StartScene {
  constructor() {
    console.log("StartScene.INIT");
    this.backgroundScene = new BackgroundScene(this);
    this.ballScene = new BallScene(this)
    this.characterScene = new CharacterScene(this)
    this.playerScene = new PlayerScene(this)
  }
  /**
   * Register all scene draw below 
   * @return {void} This function does not return any value.
   */
  draw() {
    this.playerScene.isAlive && this.playerScene.draw()
    this.backgroundScene.draw()
    this.ballScene.draw()
    /* ------------------------------- CENTER AXIS ------------------------------- */
    ctx.beginPath()
    ctx.strokeStyle = 'green'
    ctx.lineTo(canvas.clientWidth / 2, 0);
    ctx.lineTo(canvas.clientWidth / 2, canvas.clientHeight);
    ctx.stroke()
    ctx.beginPath()
    ctx.lineTo(0, canvas.clientHeight / 2);
    ctx.lineTo(canvas.clientWidth, canvas.clientHeight / 2);
    ctx.stroke()
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
  }
}

export const startScene = new StartScene(canvas.clientWidth, canvas.clientHeight); //INIT SCENE
