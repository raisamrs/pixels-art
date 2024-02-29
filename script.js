const arrPixelsBoard = document.getElementsByClassName('pixel');

/* 2 - Adicione à página um quadro contendo 25 pixels, sendo que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel */

const pixelsBoard = document.createElement('div');
pixelsBoard.id = 'pixel-board';
document.body.appendChild(pixelsBoard);

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

const clickedColor = (event) => {
  if (selectedColor) {
    selectedColor.classList.remove('selected');
  }
  event.target.classList.add('selected');
  selectedColor = event.target;
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
clearBoardBtn.id = 'clear-board';
document.body.appendChild(clearBoardBtn);
clearBoardBtn.innerText = 'Limpar quadro';

clearBoardBtn.addEventListener('click', () => {
  for (let i = 0; i < arrPixelsBoard.length; i += 1) {
    arrPixelsBoard[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
});

/* 6 - Adicione um botão para gerar cores aleatórias para a paleta de cores */
const changeColorsBtn = document.createElement('button');
changeColorsBtn.id = 'button-random-color';
changeColorsBtn.innerText = 'Cores aleatórias';
document.body.appendChild(changeColorsBtn);

function generateColorRgb(usedColors) {
  let color;
  do {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    color = `rgb(${r}, ${g}, ${b})`;
  } while (usedColors.has(color));

  usedColors.add(color);
  return color;
}

document.getElementById('button-random-color').addEventListener('click', () => {
  const usedColors = new Set();
  const colorElements = document.querySelectorAll('.color');

  colorElements.forEach((colorElement, i) => {
    const newColor = generateColorRgb(usedColors);
    const newColorElement = colorElement;
    newColorElement.style.backgroundColor = newColor;
    newColorElement.style.setProperty('--color-identifier', i);
  });
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
