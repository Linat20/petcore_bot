const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// вставь свой токен сюда:
const TOKEN = '8439578414:AAEHbxAcFwS-ym4C32O1Ohb7dHfPU0tTbfA';
const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// При нажатии на кнопку бот откроет WebApp
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://твой_будущий_сервер_или_ngrok_url'; // позже сюда добавим ссылку
  bot.sendMessage(chatId, "🔥 Добро пожаловать в PetCore!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 Играть", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

app.listen(3000, () => console.log('✅ Сервер запущен на http://localhost:3000'));