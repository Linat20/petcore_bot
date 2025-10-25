const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Загружаем изображения
const bg = new Image();
bg.src = 'images/biome_fire.png'; // фон биома

const pet = new Image();
pet.src = 'images/flaer.png'; // питомец

const arena = new Image();
arena.src = 'images/arena.png'; // здание арены

const shop = new Image();
shop.src = 'images/shop.png'; // магазин

// Когда всё загрузится — рисуем сцену
Promise.all([
  new Promise(res => bg.onload = res),
  new Promise(res => pet.onload = res),
  new Promise(res => arena.onload = res),
  new Promise(res => shop.onload = res),
]).then(() => {
  drawScene();
});

function drawScene() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Питомец (в центре)
  const petX = canvas.width / 2 - 100;
  const petY = canvas.height / 2;
  ctx.drawImage(pet, petX, petY, 200, 200);

  // Здания
  ctx.drawImage(arena, canvas.width * 0.15, canvas.height * 0.55, 180, 180);
  ctx.drawImage(shop, canvas.width * 0.75, canvas.height * 0.55, 180, 180);

  // Сохраним координаты для кликов
  clickableAreas = [
    { name: 'arena', x: canvas.width * 0.15, y: canvas.height * 0.55, w: 180, h: 180 },
    { name: 'shop',  x: canvas.width * 0.75, y: canvas.height * 0.55, w: 180, h: 180 }
  ];
}

// Отслеживание кликов
let clickableAreas = [];
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (const area of clickableAreas) {
    if (x > area.x && x < area.x + area.w && y > area.y && y < area.y + area.h) {
      if (area.name === 'arena') {
        window.location.href = 'arena.html'; // переход на арену
      } else if (area.name === 'shop') {
        window.location.href = 'shop.html'; // переход в магазин
      }
    }
  }
});