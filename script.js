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
const arrPixelsBoard = document.getElementsByClassName('pixel');

for (let i = 0; i < arrPixelsBoard.length; i += 1) {
  arrPixelsBoard[i].addEventListener('click', (event) => {
    const chosenColor = document.querySelector('.selected');
    if (chosenColor) {
      const bgColorSelectedColor = window.getComputedStyle(chosenColor).backgroundColor;
      event.target.style.backgroundColor = bgColorSelectedColor;
    }
  });
}

/* 5 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco */

const clearBoardBtn = document.createElement('button');
clearBoardBtn.id = 'clear-board';
document.body.appendChild(clearBoardBtn);
clearBoardBtn.innerText = 'Limpar';

clearBoardBtn.addEventListener('click', () => {
  for (let i = 0; i < arrPixelsBoard.length; i += 1) {
    arrPixelsBoard[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
});

/* function generateColorRgb(usedColors) {
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

document.getElementById('btn-change-colors').addEventListener('click', () => {
  const usedColors = new Set();

  for (let i = 0; i < 5; i += 1) {
    const newColor = generateColorRgb(usedColors);
    const uniqueColorRgb = document.getElementById(`color-${i + 1}`);
    uniqueColorRgb.style.backgroundColor = newColor;
  }
}); */
