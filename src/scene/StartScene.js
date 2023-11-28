import { canvas, ctx } from "../main";
import { BackgroundScene } from "./BackgroundScene";
import { BallScene } from "./BallScene";
import { BaseScene } from "./BaseScene";
import { CharacterScene, PlayerScene } from "./CharacterScene";

export class StartScene extends BaseScene {
  constructor() {
    super();
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
    this.backgroundScene.draw()
    this.ballScene.draw()
    this.playerScene.draw()
  }
  /**
   * Register all scene update below 
   * @return {void} This function does not return any value.
   */
  update() {
    this.backgroundScene.update()
    this.ballScene.update()
    this.playerScene.update()
  }
}

export const startScene = new StartScene(canvas.clientWidth, canvas.clientHeight); //INIT SCENE
