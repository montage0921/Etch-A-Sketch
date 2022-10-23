//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const slideValue = document.querySelector(`.select-value`);
const clearBtn = document.querySelector(`.clear`);
const eraserBtn = document.querySelector(`.eraser`);
const drawBtn = document.querySelector(`.draw`);
const palette = document.querySelector(`.palette`);
const confirmBtn = document.querySelector(`.confirm`);
const rainbowBtn = document.querySelector(`.rainbow`);

///////////////////////////////////////
let gridPerLine;
let grids = ``;
const grid = `<div class="grid" ></div>`;
const color = `white`;
let value;
let newColor = `black`;
let isDown = false;
const rgbArr = [0, 0, 0];
let rainbowMode = false;

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
  // totalGrids.forEach((grid) => (grid.style.backgroundColor = color));
});

//clear button
clearBtn.addEventListener(`click`, function () {
  slider.value = 1;
  slideValue.textContent = `1x1`;
  canvas.innerHTML = `<div class="grid" ></div>`;
  newColor = `black`;
  palette.value = `#000000`;
  canvas.style.gridTemplateColumns = `repeat(1, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(1, 1fr)`;
  isDown = false;
  rainbowMode = false;
});

//Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.9)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});

//draw on the canvas when dragging over grids or clicking a single grid

function draw() {
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
    if (isDown === true && rainbowMode === false) {
      e.target.style.backgroundColor = newColor;
    } else if (isDown === true && rainbowMode === true) {
      console.log(`ok`);
      const newArr = rgbArr.map((color) => Math.floor(Math.random() * 255));

      [red, green, blue] = newArr;

      newColor = `rgb(${red},${green},${blue})`;
      e.target.style.backgroundColor = newColor;
    }
  });
}

draw();

//Eraser function
eraserBtn.addEventListener(`click`, function (e) {
  rainbowMode = false;
  newColor = `white`;
});

palette.addEventListener(`change`, function () {
  rainbowMode = false;
  newColor = palette.value;
});

rainbowBtn.addEventListener(`click`, function () {
  rainbowMode = true;
  draw();
});
