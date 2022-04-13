const HOLE_HEIGHT = 220;
const PIPE_WIDTH = 120;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.75;

let pipes = [];
let timeSinceLastPipe;
let passedPipeCount;

function createPipe() {
  const pipeElement = document.createElement("div");
  const topSegment = createPipeSegment("top");
  const bottomSegment = createPipeSegment("bottom");

  pipeElement.append(topSegment);
  pipeElement.append(bottomSegment);
  pipeElement.classList.add("pipe");

  const min = HOLE_HEIGHT * 1.5;
  const max = window.innerHeight - HOLE_HEIGHT * 0.5;

  pipeElement.style.setProperty("--hole-top", randomNumberBetween(min, max));

  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElement).getPropertyValue("--pipe-left")
      );
    },

    set left(value) {
      pipeElement.style.setProperty("--pipe-left", value);
    },

    remove() {
      pipes = pipes.filter((p) => p !== pipe);
      pipeElement.remove();
    },

    rects() {
      return [
        topSegment.getBoundingClientRect(),
        bottomSegment.getBoundingClientRect(),
      ];
    },
  };

  pipe.left = window.innerWidth;

  document.body.append(pipeElement);
  pipes.push(pipe);
}

function createPipeSegment(position) {
  const segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function updatePipes(delta) {
  timeSinceLastPipe += delta;

  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL;

    createPipe();
  }

  pipes.forEach((pipe) => {
    if (pipe.left + PIPE_WIDTH < 0) {
      passedPipeCount++;
      return pipe.remove();
    }

    pipe.left = pipe.left - delta * PIPE_SPEED;
  });
}

export function setupPipes() {
  timeSinceLastPipe = PIPE_INTERVAL;
  passedPipeCount = 0;

  pipes.forEach((p) => p.remove());

  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT);
}

export function getPassedPipeCount() {
  return passedPipeCount;
}

export function getPipeRects() {
  return pipes.flatMap((pipe) => pipe.rects());
}
