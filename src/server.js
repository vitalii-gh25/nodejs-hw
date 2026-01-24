// src/server.js

import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js'; // тільки маршрути notes

const app = express();
const PORT = process.env.PORT ?? 3000;

// =======================
// Глобальні middleware
// =======================
app.use(logger); // логування запитів через pino-http
app.use(express.json()); // парсинг JSON тіла запитів
app.use(cors()); // дозволяє запити з інших доменів

// =======================
// Підключення маршрутів
// =======================
app.use(notesRoutes); // маршрути для нотаток

// =======================
// Middleware 404 та обробки помилок
// =======================
app.use(notFoundHandler); // якщо маршрут не знайдено
app.use(errorHandler); // глобальний обробник помилок

// =======================
// Підключення до MongoDB та запуск сервера
// =======================
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
