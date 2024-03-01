const arrPixelsBoard = document.getElementsByClassName('pixel');
const pixelBoardContainer = document.getElementById('pixel-board-container');
const selectedColorBlock = document.getElementById('selected-color');
const divBtnRandomColors = document.getElementById('btn-random-color-container');
const btnRandomColorsId = ('button-random-color');

/* 2 - Adicione à página um quadro contendo 25 pixels, sendo que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel */

const pixelsBoard = document.createElement('div');
pixelsBoard.id = 'pixel-board';
pixelBoardContainer.appendChild(pixelsBoard);

for (let i = 0; i < 25; i += 1) {
  const pixel = document.createElement('div');
  pixelsBoard.appendChild(pixel);
  pixel.classList.add('pixel');
}

/* 3 - Crie uma função para selecionar uma cor na paleta de cores */
const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');

let selectedColor = null;
let colors = [];

const clickedColor = (event) => {
  if (selectedColor && selectedColor.id !== 'selected-color') {
    selectedColor.classList.remove('selected');
  }
  event.target.classList.add('selected');
  selectedColor = event.target;

  const clickedColorStyle = window.getComputedStyle(event.target).backgroundColor;
  selectedColorBlock.style.backgroundColor = clickedColorStyle;
};

color1.addEventListener('click', clickedColor);
color2.addEventListener('click', clickedColor);
color3.addEventListener('click', clickedColor);
color4.addEventListener('click', clickedColor);

/* 4 - Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores */

for (let i = 0; i < arrPixelsBoard.length; i += 1) {
  arrPixelsBoard[i].addEventListener('click', (event) => {
    const chosenColor = document.querySelector('.selected');
    if (chosenColor) {
      const newEvent = { ...event };
      const bgColorSelectedColor = window.getComputedStyle(chosenColor).backgroundColor;
      newEvent.target.style.backgroundColor = bgColorSelectedColor;
    }
  });
}

/* 5 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco */

const clearBoardBtn = document.createElement('button');
clearBoardBtn.id = 'button-clear-board';
clearBoardBtn.className = 'btns';
pixelBoardContainer.appendChild(clearBoardBtn);
clearBoardBtn.innerText = 'Limpar quadro';

clearBoardBtn.addEventListener('click', () => {
  for (let i = 0; i < arrPixelsBoard.length; i += 1) {
    arrPixelsBoard[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
});

/* 6 - Adicione um botão para gerar cores aleatórias para a paleta de cores */
const changeColorsBtn = document.createElement('button');
changeColorsBtn.id = btnRandomColorsId;
changeColorsBtn.className = 'btns';
changeColorsBtn.innerText = 'Gerar cores aleatórias';
divBtnRandomColors.appendChild(changeColorsBtn);

function generateColorRgb() {
  const usedColors = new Set();
  colors = [];
  for (let i = 0; i < 4; i += 1) {
    let color;
    do {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      color = `rgb(${r}, ${g}, ${b})`;
    } while (usedColors.has(color));
    usedColors.add(color);
    colors.push(color);
  }
}

document.getElementById(btnRandomColorsId).addEventListener('click', generateColorRgb);

function updateColorElements() {
  const colorElements = document.querySelectorAll('.color');
  colorElements.forEach((colorElement, i) => {
    if (colorElement !== selectedColorBlock) {
      const newColor = colors[i];
      const newColorElement = colorElement;
      newColorElement.style.backgroundColor = newColor;
      newColorElement.style.setProperty('--color-identifier', i);
    }
  });
  color1.classList.remove('selected');
  color2.classList.remove('selected');
  color3.classList.remove('selected');
  color4.classList.remove('selected');
  selectedColorBlock.classList.add('selected');
  selectedColor = selectedColorBlock;
}
document.getElementById(btnRandomColorsId).addEventListener('click', () => {
  generateColorRgb();
  updateColorElements();
});
/* 7 - Crie uma função para salvar e recuperar o seu desenho atual no localStorage
Ao recarregar a página, o quadro deve permanecer. Para isso, a cada clique em um pixel, salve a cor e a posição no localStorage. Ao recarregar a página o quadro deverá ser recuperado a partir dos dados que foram salvos no localStorage. */
function saveDraw() {
  const draw = {};

  for (let i = 0; i < arrPixelsBoard.length; i += 1) {
    const color = getComputedStyle(arrPixelsBoard[i]).backgroundColor;
    draw[i] = color;

    localStorage.setItem('pixelBoard', JSON.stringify(draw));
  }
}

function recoveryDraw() {
  const savedDraw = JSON.parse(localStorage.getItem('pixelBoard'));

  if (savedDraw) {
    const pixelsBoard2 = document.querySelectorAll('.pixel');
    pixelsBoard2.forEach((pixel, i) => {
      if (savedDraw[i]) {
        const newPixel = pixel;
        newPixel.style.backgroundColor = savedDraw[i];
      }
    });
  }
}

pixelsBoard.addEventListener('click', (event) => {
  const selectedColor2 = document.querySelector('.selected');
  if (selectedColor2) {
    const newEvent = event;
    newEvent.target.style.backgroundColor = getComputedStyle(selectedColor2).backgroundColor;
    saveDraw();
  }
});

window.addEventListener('load', recoveryDraw);
