import { startScene } from './scene/StartScene'

const menu = document.querySelector("div.menu")
const playerStatus = document.getElementById("player-status")
const bot1Status = document.getElementById("bot1-status")
const bot2Status = document.getElementById("bot2-status")
const bot3Status = document.getElementById("bot3-status")
const /** @type {HTMLButtonElement} */ btnPlay = document.getElementById("btnPlay")
const /** @type {HTMLCanvasElement} */ canvas = document.getElementById("cvs");
const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext("2d");
let fpsInterval, initTime, now, then, elapsed; // all requirements for fps
const ONE_SECOND_IN_MS = 1000; // 1 second in ms

/**
 * Animate the function by requesting animation frames and updating the game scene.
 * Will loop through the function until the browser window is closed.
 * @return {void} This function does not return any value.
 */
const animate = () => {
  requestAnimationFrame(animate);
  now = Date.now(); //get current timestamp
  elapsed = now - then; //get elapsed time since last frame

  //check whether elapsed has passed fps interval
  if (elapsed > fpsInterval) {
    /* ------------------------------ RUN GAMESCENE ----------------------------- */
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    startScene.draw();
    startScene.update();
    /* ------------------------------ RUN GAMESCENE ----------------------------- */

    then = now - (elapsed % fpsInterval); //set `now` to `then` (as the canvas has changed frame) and tolerate miscalculated time
  }
};

/**
 * Start the animation with the given frames per second (fps).
 * Init the animation start
 * @param {number} fps - The number of frames per second.
 * @return {void} This function does not return a value.
 */
const startAnimate = (fps = 1) => {
  fpsInterval = ONE_SECOND_IN_MS / fps;
  initTime = then = Date.now();
  animate();
  console.log(`Game has started, TIMESTAMP: ${initTime}`);
};

export const CLASS_IDENTIFIER = ["one", "two", "three", "four"];
const headerGenerator = () => document.createElement("h1")

let /** @type {string|undefined} */ playerName
document.getElementById("player-name").onchange = (({ target: { value } }) => playerName = value)
btnPlay.onclick = () => {
  menu.remove()
  startScene.gameStatus = "COUNTDOWN"
  startScene.startCountdown()
  startScene.backgroundScene.bgMusic.play()
  /* ------------------------------ PLAYER STATUS ----------------------------- */
  playerStatus.classList.add(CLASS_IDENTIFIER[startScene.playerScene.playerNumber - 1]);
  const playerText = headerGenerator()
  playerText.innerText = playerName?.slice(0, 12) ?? "PLAYER"
  playerStatus.prepend(playerText)
  /* ------------------------------ PLAYER STATUS ----------------------------- */

  /* ------------------------------ BOT 1 STATUS ------------------------------ */
  bot1Status.classList.add(CLASS_IDENTIFIER[startScene.bot1.botNumber - 1]);
  const bot1Text = headerGenerator()
  bot1Text.innerText = "BOT 1"
  bot1Status.prepend(bot1Text)
  /* ------------------------------ BOT 1 STATUS ------------------------------ */

  /* ------------------------------ BOT 2 STATUS ------------------------------ */
  bot2Status.classList.add(CLASS_IDENTIFIER[startScene.bot2.botNumber - 1]);
  const bot2Text = headerGenerator()
  bot2Text.innerText = "BOT 2"
  bot2Status.prepend(bot2Text)
  /* ------------------------------ BOT 2 STATUS ------------------------------ */

  /* ------------------------------ BOT 3 STATUS ------------------------------ */
  bot3Status.classList.add(CLASS_IDENTIFIER[startScene.bot3.botNumber - 1]);
  const bot3Text = headerGenerator()
  bot3Text.innerText = "BOT 3"
  bot3Status.prepend(bot3Text)
  /* ------------------------------ BOT 3 STATUS ------------------------------ */
};
startAnimate(120); //init animate with fps given as parameter

export { ctx, canvas };
