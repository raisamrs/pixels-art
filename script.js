/* 2 - Adicione à página um quadro contendo 25 pixels, sendo que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel */

const pixelsBoard = document.createElement('div');
pixelsBoard.id = 'pixel-board';
document.body.appendChild(pixelsBoard);

for (let i = 0; i < 25; i += 1) {
  const pixel = document.createElement('div');
  pixelsBoard.appendChild(pixel);
  pixel.classList.add('pixel');
}

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
