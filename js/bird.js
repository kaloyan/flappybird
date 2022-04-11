const birdElement = document.querySelector("[data-bird]");

const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    setTop(getTop() + BIRD_SPEED * delta);
  }

  timeSinceLastJump += delta;
}

function setTop(top) {
  birdElement.style.setProperty("--bird-top", top);
}

function getTop() {
  return parseFloat(
    getComputedStyle(birdElement).getPropertyValue("--bird-top")
  );
}

export function setupBird() {
  setTop(window.innerHeight / 2);

  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}

function handleJump(event) {
  if (event.code !== "Space") return;

  timeSinceLastJump = 0;
}

export function getBirdRect() {
  return birdElement.getBoundingClientRect();
}
