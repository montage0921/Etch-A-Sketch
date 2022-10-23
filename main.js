//////DOM Selectors///////
const canvas = document.querySelector(`.canvas`);
const slider = document.querySelector(`.grid-size-slider`);
const sliderLabelValue = document.querySelector(`.select-value`);
const clearBtn = document.querySelector(`.clear`);
const eraserBtn = document.querySelector(`.eraser`);
const drawBtn = document.querySelector(`.draw`);
const confirmBtn = document.querySelector(`.confirm`);
const rainbowBtn = document.querySelector(`.rainbow`);
const palette = document.querySelector(`.palette`);

//////Parameters & Default Conditions///////
let grids = ``;
const grid = `<div class="grid" ></div>`;
let size; // e.g. 16X16
const rgbArr = [0, 0, 0]; //use for rainbow mode

let newColor = `black`; //color is black by default
let isDown = false; //mouse isn't pressed down by default
let isRainbowMode = false; //rainbow mode is off by default

//////Implement Features///////
//1. Change Canvas Size
slider.addEventListener(`input`, function (e) {
  size = e.target.value;

  sliderLabelValue.textContent = `${size}x${size}`;

  //Clear grids firstly
  grids = ``;
  canvas.innerHTML = ``;

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      grids += grid;
    }
  }

  canvas.insertAdjacentHTML(`afterbegin`, grids);

  //generate grid of square using CSS Grid
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`; //number of grids you want on each column
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`; //number of grids you want on each row
});

//2.  Clear Button
clearBtn.addEventListener(`click`, function () {
  slider.value = 1;
  sliderLabelValue.textContent = `1x1`;
  canvas.innerHTML = `<div class="grid" ></div>`;
  newColor = `black`;
  palette.value = `#000000`;
  canvas.style.gridTemplateColumns = `repeat(1, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(1, 1fr)`;
  isDown = false;
  isRainbowMode = false;
});

//3. Set up a "mouse hover" effect
canvas.addEventListener(`mouseover`, function (e) {
  e.target.style.filter = `brightness(0.9)`;
});

canvas.addEventListener(`mouseout`, function (e) {
  e.target.style.filter = `brightness(1)`;
});

//4. Draw on the Canvas when Dragging Over Grids
function draw() {
  //The following 4 event listeners are used to judge if `dragging` happens.
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
    if (isDown === true && isRainbowMode === false) {
      e.target.style.backgroundColor = newColor;
    } else if (isDown === true && isRainbowMode === true) {
      const newArr = rgbArr.map((color) => Math.floor(Math.random() * 255));

      [red, green, blue] = newArr;

      newColor = `rgb(${red},${green},${blue})`;
      e.target.style.backgroundColor = newColor;
    }
  });
}

draw();

//5. Eraser Function
eraserBtn.addEventListener(`click`, function (e) {
  isRainbowMode = false;
  newColor = `white`;
});

//6. Palette Function (Change Colors)
palette.addEventListener(`change`, function () {
  isRainbowMode = false;
  newColor = palette.value;
});

// 7. Rainbow Function(Random Colors when Drawing)
rainbowBtn.addEventListener(`click`, function () {
  isRainbowMode = true;
  draw();
});
