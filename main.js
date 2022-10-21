//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const slideValue = document.querySelector(`.select-value`);

/////////////////////////////////////////////
let gridPerLine; //16x16
let grids = ``;
const grid = `<div class="grid" ></div>`;
const color = `white`;

slider.addEventListener(`input`, function (e) {
  let value = e.target.value;
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

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.9)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});

//change color when dragging
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
    e.target.style.backgroundColor = `black`;
  }
});

canvas.addEventListener(`click`, function (e) {
  e.target.style.backgroundColor = `black`;
});
