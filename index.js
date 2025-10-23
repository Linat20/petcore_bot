const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const TOKEN = process.env.BOT_TOKEN || '8439578414:AAEHbxAcFwS-ym4C32O1Ohb7dHfPU0tTbfA';
const app = express();

const bot = new TelegramBot(TOKEN);
const URL = 'https://petcore-bot.onrender.com'; // замени на адрес Render после деплоя

// Настраиваем статические файлы (для webapp)
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем webhook
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.setWebHook(`${URL}/bot${TOKEN}`);

// При нажатии /start отправляем сообщение с кнопкой
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = URL;

  bot.sendMessage(chatId, "🔥 Добро пожаловать в PetCore!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎮 Играть", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});