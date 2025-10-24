let progress = 0;
const progressBar = document.querySelector('.progress');

const interval = setInterval(() => {
  progress += 2; // шаг
  progressBar.style.width = progress + '%';

  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      window.location.href = 'menu.html';
    }, 500);
  }
}, 600); // длительность ~3 сек