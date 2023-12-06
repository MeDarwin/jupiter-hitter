import { BackgroundScene } from "./BackgroundScene";
import { BallScene } from "./BallScene";
import { BotScene, PlayerScene } from "./CharacterScene";
import { ScoreScene } from "./ScoreScene";
import { TimerScene } from "./TimerScene";

const /** @type {HTMLCanvasElement} */ canvas = document.getElementById("cvs");
const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext("2d");

export class StartScene {
  constructor() {
    console.log("StartScene.INIT");
    /** @type {"COUNTDOWN"|"GAME"|"GAMEOVER"|"PAUSE"|"WIN"|"UNINITIALIZED"}*/
    this.gameStatus = "UNINITIALIZED";
    this.isMute = false;
    this.assignNumber = [];
    this.countdown = 3;
    this.fontSize = 180;
    this.randNumGenerate = () => Math.floor(Math.random() * 4 + 1);
    this.startCountdown = () => {
      const countdown = setInterval(() => {
        if (this.countdown === 1) {
          this.gameStatus = "GAME";
          clearInterval(countdown); //cleanup
        }
        if (this.gameStatus === "COUNTDOWN") {
          this.countdown -= 1;
          this.fontSize = 180;
        }
      }, 1000)
    };
    for (let i = 1; i <= 4; i++) {
      let randomNumber = this.randNumGenerate();
      while (this.assignNumber.includes(randomNumber)) {
        randomNumber = this.randNumGenerate();
      }
      this.assignNumber.push(randomNumber);
    }
    /* --------------------------------- BG GRAD -------------------------------- */
    this.blueColor = "rgba(5, 2, 55, 1)";
    this.purpleColor = "rgba(67, 11, 76, 1)";
    this.background = ctx.createLinearGradient(200, 600, 200, 0);
    this.background.addColorStop(1, this.blueColor);
    this.background.addColorStop(0, this.purpleColor);
    /* --------------------------------- BG GRAD -------------------------------- */
    this.backgroundScene = new BackgroundScene(this);
    this.timerScene = new TimerScene(this);
    this.scoreScene = new ScoreScene(this);
    this.ballScene = new BallScene(this);
    this.playerScene = new PlayerScene(this, this.assignNumber[0]);
    this.bot1 = new BotScene(this, this.assignNumber[1], 1);
    this.bot2 = new BotScene(this, this.assignNumber[2], 2);
    this.bot3 = new BotScene(this, this.assignNumber[3], 3);
  }
  /**
   * Register all scene draw below
   * @return {void} This function does not return any value.
   */
  draw() {
    ctx.fillStyle = this.background; //gradient style
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); //draw bg grad
    this.playerScene.isAlive && this.playerScene.draw();
    this.bot1.isAlive && this.bot1.draw();
    this.bot2.isAlive && this.bot2.draw();
    this.bot3.isAlive && this.bot3.draw();
    this.backgroundScene.draw();
    this.ballScene.draw();
    this.timerScene.draw();
    this.scoreScene.draw();
    if (this.gameStatus === "COUNTDOWN") {
      this.fontSize -= 1.5;
      ctx.font = `bold ${this.fontSize}px Kdam Thmor Pro`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(this.countdown, canvas.clientWidth / 2, canvas.clientHeight / 2);
    }
  }
  /**
   * Register all scene update below
   * @return {void} This function does not return any value.
   */
  update() {
    if (this.gameStatus === "UNINITIALIZED") return; //dont do anything if not initialized
    this.isMute && this.backgroundScene.bgMusic.pause()
    !this.isMute && this.backgroundScene.bgMusic.play()
    if (this.gameStatus !== "GAME") return; //stop here if not on game
    this.backgroundScene.update();
    this.ballScene.update();
    this.playerScene.isAlive && this.playerScene.update();
    this.bot1.isAlive && this.bot1.update();
    this.bot2.isAlive && this.bot2.update();
    this.bot3.isAlive && this.bot3.update();
    if (!this.bot1.isAlive && !this.bot2.isAlive && !this.bot3.isAlive) {
      this.gameStatus = "WIN"
    }
    this.scoreScene.update()
  }
}

const startScene = new StartScene(); //INIT SCENE

export { startScene };
