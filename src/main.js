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
  requestAnimationFrame(animate); //request loop animation
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
  fpsInterval = ONE_SECOND_IN_MS / fps; //get how much time should elapse between each frame
  initTime = then = Date.now();
  animate(); //call the animate func to start the game
  console.log(`Game has started, TIMESTAMP: ${initTime}`);
};

export const CLASS_IDENTIFIER = ["one", "two", "three", "four"]; //dynamic class identifier

/** func to createElement h1
 * @return {HTMLHeadingElement} 
 * */
const headerGenerator = (text) => {
  const h1 = document.createElement("h1"); h1.innerText = text; return h1
}

let /** @type {string|undefined} */ playerName

document.getElementById("exit").onclick = () => window.close()
document.getElementById("pause").onclick = ({ target }) => {
  if (startScene.gameStatus === "GAME" || startScene.gameStatus === "PAUSE")
    startScene.gameStatus = startScene.gameStatus === "PAUSE" ? "GAME" : "PAUSE";
  target.blur()
}
document.getElementById("mute").onclick = ({ target }) => {
  startScene.isMute = !startScene.isMute
    ; target.blur()
}
document.getElementById("player-name").onchange = (({ target: { value } }) => playerName = value)

btnPlay.onclick = () => {
  menu.remove()
  startScene.gameStatus = "COUNTDOWN"
  startScene.startCountdown()
  /* ------------------------------ PLAYER STATUS ----------------------------- */
  playerStatus.classList.add(CLASS_IDENTIFIER[startScene.playerScene.playerNumber - 1]);
  playerStatus.prepend(headerGenerator(playerName?.slice(0, 12) ?? "PLAYER"))
  /* ------------------------------ PLAYER STATUS ----------------------------- */

  /* ------------------------------ BOT 1 STATUS ------------------------------ */
  bot1Status.classList.add(CLASS_IDENTIFIER[startScene.bot1.botNumber - 1]);
  bot1Status.prepend(headerGenerator("BOT 1"))
  /* ------------------------------ BOT 1 STATUS ------------------------------ */

  /* ------------------------------ BOT 2 STATUS ------------------------------ */
  bot2Status.classList.add(CLASS_IDENTIFIER[startScene.bot2.botNumber - 1]);
  bot2Status.prepend(headerGenerator("BOT 2"))
  /* ------------------------------ BOT 2 STATUS ------------------------------ */

  /* ------------------------------ BOT 3 STATUS ------------------------------ */
  bot3Status.classList.add(CLASS_IDENTIFIER[startScene.bot3.botNumber - 1]);
  bot3Status.prepend(headerGenerator("BOT 3"))
  /* ------------------------------ BOT 3 STATUS ------------------------------ */
};
startAnimate(120); //init animate with fps given as parameter

export { ctx, canvas };
