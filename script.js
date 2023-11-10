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
