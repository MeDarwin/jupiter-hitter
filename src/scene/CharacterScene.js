import { canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

export class CharacterScene {
  constructor(/** @type {StartScene} */ game) {
    this.game = game
    console.log("CharacterScene.INIT");
    this.playerArray = [1, 2, 3, 4]
  }
}

export class PlayerScene {
  constructor(/** @type {StartScene} */game) {
    this.game = game
    console.log("PlayerScene.INIT");
    this.hitting = false
    this.isAlive = true
    this.inRange = false
    this.playerArray = this.game.characterScene.playerArray //destructure
    this.jupiterSize = this.game.backgroundScene.jupiterSize //destructure
    this.ballDirection = this.game.ballScene.direction //destructure
    this.playerSize = 100
    this.lives = 3
    this.x = this.playerSize / 2 //place to center x
    this.y = this.playerSize / 2 //place to center y
    this.playerNumber = 1 //assign player number
    // this.playerNumber = Math.floor(Math.random() * this.playerArray.length + 1) //assign player number
    this.playerArray.splice(this.playerArray.indexOf(this.playerNumber), 1) //remove occupied numebr
    this.playerRotation = (this.playerNumber * 90) - 45 //rotate player according to player number (on degree scale)
    console.table({ array: this.game.characterScene.playerArray, number: this.playerNumber, pRot: this.playerRotation + 30 });
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.playerSpriteDefault = new Image()
    this.playerSpriteCaught = new Image()
    this.playerSpriteHit = new Image()
    this.playerSpriteDefault.src = "../../assets/img/player.png"
    this.playerSpriteCaught.src = "../../assets/img/bot0-caught.png"
    this.playerSpriteHit.src = "../../assets/img/bot0-hit.png"
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.playerSprite = this.playerSpriteDefault
    console.log(this.playerRotation - 30, this.playerRotation + 30);
    /* ------------------------------- CONTROLLER ------------------------------- */
    window.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case " ":
          this.hitting = true
          this.playerSprite = this.playerSpriteHit
          setTimeout(() => { this.playerSprite = this.playerSpriteDefault; this.hitting = false }, 1000)

          if (!this.inRange) return;
          this.ballDirection = this.game.ballScene.direction = ((this.game.ballScene.direction === "positive") ? "negative" : "positive")
          break;
      }
    })
    /* ------------------------------- CONTROLLER ------------------------------- */
  }
  draw() {
    ctx.save() //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2) //translate to center
    ctx.rotate(this.playerRotation * Math.PI / 180) //rotate player according to player number
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.strokeStyle = "yellow" //! debug player range
    ctx.strokeRect(-this.x - this.playerSize / 2, -this.y - (this.jupiterSize / 2) - 40, this.playerSize / 2, this.playerSize) //! draw debug stroke for area
    ctx.strokeRect(this.x, -this.y - (this.jupiterSize / 2) - 40, this.playerSize / 2, this.playerSize) //! draw debug stroke for area
    ctx.strokeStyle = "blue" //! debug player size
    ctx.strokeRect(-this.x, -this.y - (this.jupiterSize / 2) - 40, this.playerSize, this.playerSize) //! draw debug stroke for player
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.drawImage(this.playerSprite, -this.x, -this.y - (this.jupiterSize / 2) - 40, this.playerSize, this.playerSize)
    ctx.restore() //restore context to last saved context (default context)
  }
  update() {
    if (this.lives === 0) this.isAlive = false // set alive to false if lives = 0 (dead)
    //check if ball hit player
    if (this.game.ballScene.ballRotationAngle === this.playerRotation) {
      console.log("PlayerScene.HIT", this.lives -= 1);
      this.playerSprite = this.playerSpriteCaught
      setTimeout(() => this.playerSprite = this.playerSpriteDefault, 700)
    }
    //check if ball in range positive
    if (this.ballDirection == "positive")
      (this.game.ballScene.ballRotationAngle > this.playerRotation - 30 && this.game.ballScene.ballRotationAngle < this.playerRotation)
        ? this.inRange = true
        : this.inRange = false;

    //check if ball in range negative
    if (this.ballDirection == "negative")
      (this.game.ballScene.ballRotationAngle < this.playerRotation + 30 && this.game.ballScene.ballRotationAngle > this.playerRotation)
        ? this.inRange = true
        : this.inRange = false
  }
}