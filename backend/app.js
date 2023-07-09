require('dotenv').config();

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('./middlevares/cors');
const routes = require('./routes/index');
const errorHandler = require('./middlevares/error');
const NotFoundError = require('./errors/error-not-found');
const { requestLogger, errorLogger } = require('./middlevares/logger');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
// лимитер запросов, нужен для ограничения количества запросов
// к API и предотвращения перегрузки сервера или снижения производительности приложения
app.use(limiter);
// помогает защитить приложение Node.js от уязвимостей и кибератак, включая CSRF, XSS и другие
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors);

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Ошибка запроса, не найден путь'));
});
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`Слушаю порт ${PORT}`); });
