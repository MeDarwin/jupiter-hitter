import { CLASS_IDENTIFIER, canvas, ctx } from "../main";
import { StartScene } from "./StartScene";

const playerStatus = document.getElementById("player-status")

export class PlayerScene {
  constructor(/** @type {StartScene} */ game, playerNumber) {
    this.game = game;
    this.playerNumber = playerNumber;
    console.log("PlayerScene.INIT");
    this.hitting = false;
    this.isAlive = true;
    this.inRange = false;
    this.crouch = false;
    this.uncrouch = false;
    this.crouchDelay = false;
    this.jupiterSize = this.game.backgroundScene.jupiterSize; //destructure
    this.playerDirection = this.game.ballScene.direction;
    this.crouchTime = 6000; // ms
    this.playerSize = 100;
    this.warnWidth = 300;
    this.lives = 3;
    this.range = 30;
    this.x = this.playerSize / 2; //place to center x
    this.y = this.playerSize / 2; //place to center y
    this.playerRotation = this.playerNumber * 90 - 45; //rotate player according to player number (on degree scale)
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.playerSpriteDefault = new Image();
    this.playerSpriteCaught = new Image();
    this.playerSpriteHit = new Image();
    this.playerSpriteDefault.src = "../../assets/img/player.png";
    this.playerSpriteCaught.src = "../../assets/img/bot0-caught.png";
    this.playerSpriteHit.src = "../../assets/img/bot0-hit.png";
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.playerSprite = this.playerSpriteDefault;
    /* ------------------------------- CONTROLLER ------------------------------- */
    window.addEventListener("keydown", ({ key }) => {
      if (!this.isAlive) return;
      if (this.crouch || this.uncrouch) return;
      if (this.hitting) return;
      if (this.game.gameStatus !== "GAME") return;
      switch (key) {
        case " ":
          this.hitting = true;
          this.playerSprite = this.playerSpriteHit;
          setTimeout(() => {
            this.playerSprite = this.playerSpriteDefault;
            this.hitting = false;
          }, 200);
          this.playerDirection = this.game.ballScene.direction;

          if (!this.inRange) return;
          this.game.ballScene.direction = this.game.ballScene.direction = this.game.ballScene.direction === "positive" ? "negative" : "positive";
          break;
        case "ArrowDown":
          if (this.crouchDelay) return;
          this.crouch = true;
          this.dispatchDelay();
          break;
      }
    });
    /* ------------------------------- CONTROLLER ------------------------------- */
  }
  debug() {
    ctx.save(); //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2); //translate to center
    ctx.rotate((this.playerRotation * Math.PI) / 180); //rotate player according to player number
    ctx.scale(this.playerDirection === "positive" ? 1 : -1, 1);
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.strokeStyle = "yellow"; //! debug player range
    ctx.strokeRect(this.x - this.playerSize - this.range, -this.y - this.jupiterSize / 2 - 40, this.range, this.playerSize); //! draw debug stroke for area
    ctx.strokeRect(this.x, -this.y - this.jupiterSize / 2 - 40, this.range, this.playerSize); //! draw debug stroke for area
    ctx.strokeStyle = "blue"; //! debug player size
    ctx.strokeRect(-this.x, -this.y - this.jupiterSize / 2 - 40, this.playerSize, this.playerSize); //! draw debug stroke for player
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.restore(); //restore context to last saved context (default context)
  }
  draw() {
    ctx.save(); //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2); //translate to center
    ctx.rotate((this.playerRotation * Math.PI) / 180); //rotate player according to player number
    ctx.scale(this.playerDirection === "positive" ? 1 : -1, 1);
    ctx.drawImage(this.playerSprite, -this.x, -this.y - this.jupiterSize / 2 - 40, this.playerSize, this.playerSize);
    ctx.restore(); //restore context to last saved context (default context)
    if (this.crouchDelay) {
      ctx.fillStyle = "orange";
      ctx.fillRect(canvas.clientWidth / 2 - this.warnWidth / 2, canvas.clientHeight - 20, this.warnWidth, 10);
    }
  }
  update() {
    // set alive to false if lives = 0 (dead)
    if (this.lives === 0) this.isAlive = false;

    //check if ball hit player
    if (this.game.ballScene.ballRotationAngle === this.playerRotation) {
      if (this.crouch || this.uncrouch) return;
      console.log("PlayerScene.HIT");
      this.lives -= 1;
      this.playerSprite = this.playerSpriteCaught;
      this.hitting = true;
      setTimeout(() => {
        this.playerSprite = this.playerSpriteDefault;
        this.hitting = false;
      }, 200);
      this.lives === 0 && playerStatus.children[2].classList.remove("hidden");
      playerStatus.children[1].firstElementChild.remove()
    }

    //check if ball in range positive
    if (this.game.ballScene.direction === "positive")
      this.game.ballScene.ballRotationAngle > this.playerRotation - this.range && this.game.ballScene.ballRotationAngle < this.playerRotation
        ? (this.inRange = true)
        : (this.inRange = false);

    //check if ball in range negative
    if (this.game.ballScene.direction === "negative")
      this.game.ballScene.ballRotationAngle < this.playerRotation + this.range && this.game.ballScene.ballRotationAngle > this.playerRotation
        ? (this.inRange = true)
        : (this.inRange = false);

    //crouch for player
    if (this.crouch) {
      this.y -= 3;
      if (this.y <= -this.playerSize) {
        this.uncrouch = true;
        this.crouch = false;
      }
    }
    if (this.uncrouch) {
      this.y += 3;
      if (this.y > this.playerSize / 2) {
        this.y -= this.y - this.playerSize / 2; //tolerate miscalculation
        this.uncrouch = false;
      }
    }
  }
  dispatchDelay() {
    this.crouchDelay = true;
    this.warnWidth = this.crouchTime / 10
    const decreaser = setInterval(() => (this.warnWidth -= 1), 10);
    setTimeout(() => {
      this.crouchDelay = false;
      this.warnWidth = this.crouchTime / 10
      clearInterval(decreaser);
    }, this.crouchTime);
  }
}

export class BotScene {
  constructor(/** @type {StartScene} */ game, botNumber, spriteNumber) {
    this.game = game;
    this.botNumber = botNumber;
    console.log("BotScene.INIT");
    this.botChance = ["caught", "hit", "crouch"];
    this.botNextMoveQueue = [];
    /** @type {"hit"|"crouch"|"caught"}*/ this.botNextMove = "hit";
    this.hitting = false;
    this.isAlive = true;
    this.inRange = false;
    this.crouch = false;
    this.uncrouch = false;
    this.jupiterSize = this.game.backgroundScene.jupiterSize; //destructure
    this.botDirection = this.game.ballScene.direction;
    this.botSize = 100;
    this.lives = 3;
    this.range = 20;
    this.x = this.botSize / 2; //place to center x
    this.y = this.botSize / 2; //place to center y
    this.botRotation = this.botNumber * 90 - 45; //rotate bot according to bot number (on degree scale)
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.botSpriteDefault = new Image();
    this.botSpriteCaught = new Image();
    this.botSpriteHit = new Image();
    this.botSpriteDefault.src = `../../assets/img/bot${spriteNumber}.png`;
    this.botSpriteCaught.src = `../../assets/img/bot${spriteNumber}-caught.png`;
    this.botSpriteHit.src = `../../assets/img/bot${spriteNumber}-hit.png`;
    /* ------------------------------ IMAGE PRELOAD ----------------------------- */
    this.botSprite = this.botSpriteDefault;
  }

  debug() {
    ctx.save(); //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2); //translate to center
    ctx.rotate((this.botRotation * Math.PI) / 180); //rotate bot according to bot number
    ctx.scale(this.botDirection === "positive" ? 1 : -1, 1);
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.strokeStyle = "yellow"; //! debug bot range
    ctx.strokeRect(this.x - this.botSize - this.range, -this.y - this.jupiterSize / 2 - 40, this.range, this.botSize); //! draw debug stroke for area
    ctx.strokeRect(this.x, -this.y - this.jupiterSize / 2 - 40, this.range, this.botSize); //! draw debug stroke for area
    ctx.strokeStyle = "blue"; //! debug bot size
    ctx.strokeRect(-this.x, -this.y - this.jupiterSize / 2 - 40, this.botSize, this.botSize); //! draw debug stroke for bot
    /* ---------------------------------- DEBUG --------------------------------- */
    ctx.restore(); //restore context to last saved context (default context)
  }
  draw() {
    ctx.save(); //save default context (where ctx x and y = 0, not translated)
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2); //translate to center
    ctx.rotate((this.botRotation * Math.PI) / 180); //rotate bot according to bot number
    ctx.scale(this.botDirection === "positive" ? 1 : -1, 1);
    ctx.drawImage(this.botSprite, -this.x, -this.y - this.jupiterSize / 2 - 40, this.botSize, this.botSize);
    ctx.restore(); //restore context to last saved context (default context)
  }
  update() {
    // set alive to false if lives = 0 (dead)
    if (this.lives === 0) this.isAlive = false;

    //check if ball hit bot
    if (this.game.ballScene.ballRotationAngle === this.botRotation) {
      if (this.crouch) return;
      console.log(`BotScene-${this.botNumber}.HIT`);
      this.lives -= 1;
      this.botSprite = this.botSpriteCaught;
      this.hitting = true;
      setTimeout(() => {
        this.botSprite = this.botSpriteDefault;
        this.hitting = false;
      }, 200);
      this.lives === 0 && document.getElementsByClassName(CLASS_IDENTIFIER[this.botNumber - 1])[0].children[2].classList.remove("hidden");
      document.getElementsByClassName(CLASS_IDENTIFIER[this.botNumber - 1])[0].children[1].firstElementChild.remove()
    }

    //do crouch for bot
    if (this.crouch) {
      if (!this.uncrouch) this.y -= 3;
      if (this.y <= -this.botSize) this.uncrouch = true;
    }
    if (this.uncrouch) {
      this.y += 3;
      if (this.y > this.botSize / 2) {
        this.y -= this.y - this.botSize / 2;
        this.crouch = false;
        this.uncrouch = false;
      }
    }

    //assign new queue when after bot do action
    if (this.botNextMoveQueue.length < 2) {
      this.botNextMoveQueue.push(this.botChance[Math.floor(Math.random() * this.botChance.length)]);
    }

    //! NEED REFACTOR
    /* --------------------------- BOT FUNCTIONALITIES -------------------------- */
    //check if in range clockwise direction
    if (this.game.ballScene.ballRotationAngle > this.botRotation - this.range && this.game.ballScene.ballRotationAngle < this.botRotation) {
      if (this.game.ballScene.direction === "positive") {
        if (this.botNextMoveQueue[0] === "hit" && !this.crouch) {
          this.botSprite = this.botSpriteHit;
          setTimeout(() => (this.botSprite = this.botSpriteDefault), 200);
          this.botDirection = "positive";
          this.game.ballScene.direction = "negative";
        }
        if (this.botNextMoveQueue[0] === "crouch") {
          this.crouch = true;
        }
        setTimeout(() => this.botNextMoveQueue.shift(), 500); //delay to prevent too quick next move action
      }
    }

    //check if in range counter-clockwise direction
    if (this.game.ballScene.ballRotationAngle < this.botRotation + this.range && this.game.ballScene.ballRotationAngle > this.botRotation) {
      if (this.game.ballScene.direction === "negative") {
        if (this.botNextMoveQueue[0] === "hit" && !this.crouch) {
          this.botSprite = this.botSpriteHit;
          setTimeout(() => (this.botSprite = this.botSpriteDefault), 200);
          this.botDirection = "negative";
          this.game.ballScene.direction = "positive";
        }
        if (this.botNextMoveQueue[0] === "crouch") {
          this.crouch = true;
        }
        setTimeout(() => this.botNextMoveQueue.shift(), 500); //delay to prevent too quick next move action
      }
    }
    /* --------------------------- BOT FUNCTIONALITIES -------------------------- */
  }
}
