//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);

/////////////////////////////////////////////////
const gridPerLine = 16; //16x16
const color = `red`; //grid color

let grids = ``;
const grid = `<div class="grid" ></div>`;

for (let i = 1; i <= gridPerLine; i++) {
  for (let j = 1; j <= gridPerLine; j++) {
    grids += grid;
  }
}
canvas.insertAdjacentHTML(`afterbegin`, grids);

//assign color to CSS
const gridsHTML = document.querySelectorAll(`.grid`);
gridsHTML.forEach((grid) => (grid.style.backgroundColor = color));

//generate grid of square using CSS Grid
//  grid-template-columns: repeat(16, 1fr);
//   grid-template-rows: repeat(16, 1fr);
canvas.style.gridTemplateColumns = `repeat(${gridPerLine}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridPerLine}, 1fr)`;

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.backgroundColor = `black`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.backgroundColor = color;
});
