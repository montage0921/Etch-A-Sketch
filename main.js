//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const slideValue = document.querySelector(`.select-value`);
const clearBtn = document.querySelector(`.clear`);
const eraserBtn = document.querySelector(`.eraser`);
const drawBtn = document.querySelector(`.draw`);
const palette = document.querySelector(`.palette`);
const confirmBtn = document.querySelector(`.confirm`);

///////////////////////////////////////
let gridPerLine;
let grids = ``;
const grid = `<div class="grid" ></div>`;
const color = `white`;
let value;
let newColor = ``;
let isDown = false;

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
  newColor = ``;
  palette.value = `#000000`;
});

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.9)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});

//draw on the canvas when dragging over or clicking grids

canvas.addEventListener(`mousedown`, function (e) {
  const childrenList = canvas.children;

  if (childrenList.length !== 0) isDown = true;
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

//Draw Function
drawBtn.addEventListener(`click`, function (e) {
  newColor = `black`;
});

//Palette Function
confirmBtn.addEventListener(`click`, function (e) {
  newColor = palette.value;
});
