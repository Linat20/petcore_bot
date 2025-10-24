const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const TOKEN = process.env.BOT_TOKEN || '8439578414:AAEHbxAcFwS-ym4C32O1Ohb7dHfPU0tTbfA';
const URL = 'https://petcore-bot.onrender.com'; // твой Render-домен
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Создаём бота в режиме "без polling"
const bot = new TelegramBot(TOKEN, { webHook: true });

// ✅ Подключаем webhook (теперь бот принимает апдейты от Telegram)
bot.setWebHook(`${URL}/bot${TOKEN}`);

// ✅ Принимаем апдейты от Telegram
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 📩 Реакция на /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  // Всегда отправляем приветствие заново
  await bot.sendMessage(chatId, '🔥 Добро пожаловать в *PetCore*!', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎮 Играть', web_app: { url: URL } }]
      ]
    }
  });
});

// 📩 Обработка других сообщений
bot.on('message', async (msg) => {
  if (msg.text && !msg.text.startsWith('/start')) {
    await bot.sendMessage(msg.chat.id, 'Нажми /start чтобы начать игру 🎮');
  }
});

// 🚀 Запуск Express-сервера
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));