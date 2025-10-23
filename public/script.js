const tg = window.Telegram.WebApp;
tg.expand(); // раскрывает игру на весь экран

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;

let y = 150;
let direction = 1;

function animate() {
  ctx.clearRect(0, 0, 300, 300);

  // рисуем питомца (круг — позже заменим на Флаера)
  ctx.beginPath();
  ctx.arc(150, y, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#ff8800";
  ctx.fill();

  y += direction * 0.5;
  if (y > 160 || y < 140) direction *= -1;

  requestAnimationFrame(animate);
}

animate();