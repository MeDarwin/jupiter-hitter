import { startScene } from './scene/StartScene'

const menu = document.querySelector("div.menu")
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

  //check whether elapsed has passed 1 second (1000 ms)
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
 * @return {undefined} This function does not return a value.
 */
const startAnimate = (fps = 1) => {
  fpsInterval = ONE_SECOND_IN_MS / fps;
  initTime = then = Date.now();
  animate();
  console.log(`Game has started, TIMESTAMP: ${initTime}`);
};
// startAnimate(60); //call to init animation to begin the game and set fps as parameter

btnPlay.onclick = () => {
  menu.remove()
  startScene.gameStatus = "COUNTDOWN"
  startScene.startCountdown()
};
startAnimate(60);

export { ctx, canvas };
