//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const slideValue = document.querySelector(`.select-value`);

/////////////////////////////////////////////
let gridPerLine; //16x16
let grids = ``;
const grid = `<div class="grid" ></div>`;
const color = `red`;

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

  //assign color
  const gridsHTML = document.querySelectorAll(`.grid`);
  gridsHTML.forEach((grid) => (grid.style.backgroundColor = color));

  //generate grid of square using CSS Grid
  canvas.style.gridTemplateColumns = `repeat(${gridPerLine}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${gridPerLine}, 1fr)`;
});

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.5)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});
