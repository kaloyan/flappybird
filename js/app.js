import { updateBird, setupBird, getBirdRect } from "./bird.js";
import { updatePipes, setupPipes, getPassedPipeCount } from "./pipe.js";

document.addEventListener("keypress", handleStart, { once: true });

const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");

let lastTime;

function handleStart() {
  title.classList.add("hide");
  subtitle.classList.add("hide");

  setupBird();
  setupPipes();

  lastTime = null;
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide");
    subtitle.classList.remove("hide");
    subtitle.textContent = `passed ${getPassedPipeCount()} pipes`;

    document.addEventListener("keypress", handleStart, { once: true });
  }, 100);
}

function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }

  const delta = time - lastTime;

  updateBird(delta);
  updatePipes(delta);

  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose() {
  const birdRect = getBirdRect();

  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outsideWorld;
}
