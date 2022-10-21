//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const slideValue = document.querySelector(`.select-value`);
const clearBtn = document.querySelector(`.clear`);
const eraserBtn = document.querySelector(`.eraser`);
const drawBtn = document.querySelector(`.draw`);

///////////////////////////////////////
let gridPerLine; //16x16
let grids = ``;
const grid = `<div class="grid" ></div>`;
const color = `white`;
let value;

slider.addEventListener(`input`, function (e) {
  value = e.target.value;

  slideValue.textContent = `${value}x${value}`;
  gridPerLine = value;

  grids = ``;
  canvas.innerHTML = ``;

  for (let i = 1; i <= gridPerLine; i++) {
    for (let j = 1; j <= gridPerLine; j++) {
      grids += grid;
    }
  }

  canvas.insertAdjacentHTML(`afterbegin`, grids);

  //generate grid of square using CSS Grid
  canvas.style.gridTemplateColumns = `repeat(${gridPerLine}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${gridPerLine}, 1fr)`;

  const totalGrids = document.querySelectorAll(`.grid`);

  //assign grid color
  totalGrids.forEach((grid) => (grid.style.backgroundColor = color));
});

//clear button
clearBtn.addEventListener(`click`, function () {
  slider.value = 0;
  slideValue.textContent = ``;
  canvas.innerHTML = ``;
  newColor = `black`;
});

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.9)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});

//draw on the canvas when dragging over or clicking grids
let newColor = `black`;
let isDown = false;

canvas.addEventListener(`mousedown`, function (e) {
  isDown = true;
});

canvas.addEventListener(`mouseup`, function (e) {
  isDown = false;
});

canvas.addEventListener(`mouseleave`, function (e) {
  isDown = false;
});

canvas.addEventListener(`mousemove`, function (e) {
  if (isDown === true) {
    e.target.style.backgroundColor = newColor;
  }
});

canvas.addEventListener(`click`, function (e) {
  if (isDown === true) e.target.style.backgroundColor = newColor;
});

//Eraser function
eraserBtn.addEventListener(`click`, function (e) {
  newColor = `white`;
});

drawBtn.addEventListener(`click`, function (e) {
  newColor = `black`;
});
