// using Canvas API

const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
//initialising x and y not defining them
let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  //offsetX and offsetY give positioning of where the mouse is on mousedown
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    //for continuous line
    drawLine(x, y, x2, y2);

    //setting x as new position of where x2 was last
    x = x2;
    y = y2;
  }
});

// x and y = positioning where I want to draw circle
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

//x1 y1 = points drawing the line from
//x2 y2 = draws the line to here
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  //color of the line needs to be filled in - stroke style is like a border
  ctx.strokeStyle = color;

  ctx.lineWidth = size * 2; //circle radius x 2 to get diameter so same width as circle being drawn
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

colorEl.addEventListener("change", (e) => (color = e.target.value));

increaseBtn.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

clearEl.addEventListener("click", () => {
  // clears canvas from 0, 0 to complete width and height of canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
