import { canvas, ctx } from "../main";
import { BasePLayer, BaseScene } from "./BaseScene";
import { StartScene } from "./StartScene";

export class CharacterScene extends BaseScene {
  constructor(/** @type {StartScene} */ game) {
    super();
    this.game = game
    console.log("CharacterScene.INIT");
    this.playerArray = [1, 2, 3, 4]
  }
}

export class PlayerScene extends BasePLayer {
  constructor(/** @type {StartScene} */game) {
    super()
    this.game = game
    console.log("PlayerScene.INIT");
    this.playerSize = 100
    /* ---------------------------- SET PLAYER NUMBER --------------------------- */
    this.playerNumber = Math.floor(Math.random() * this.game.characterScene.playerArray.length)
    this.game.characterScene.playerArray.splice(this.game.characterScene.playerArray.indexOf(this.playerNumber), 1)
    /* ---------------------------- SET PLAYER NUMBER --------------------------- */

    console.log(this.game.characterScene.playerArray, this.playerNumber);

    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.playerSprite = new Image()
    this.playerSprite.src = "../../assets/img/player.png"
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
  }
  draw() {
    ctx.save() //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
    ctx.drawImage(this.playerSprite, 0, 0, this.playerSize, this.playerSize)
    ctx.restore() //restore context to last saved context (default context)
  }
  update() { }
}