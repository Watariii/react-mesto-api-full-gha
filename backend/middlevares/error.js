const BadRequestError = require('../errors/error-bad-request');
const UniqueEmailError = require('../errors/error-unique-email');
const AuthError = require('../errors/error-auth');

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.name === 'CastError') {
    error = new BadRequestError('Некорректный id пользователя');
    res.status(error.statusCode).send({ name: error.name, message: error.message });
  } else if (err.name === 'ValidationError') {
    error = new BadRequestError('Ошибка валидации');
    res.status(error.statusCode).send({ name: error.name, message: error.message });
  } else if (err.name === 'SyntaxError') {
    error = new BadRequestError('Ошибка синтаксиса');
    res.status(error.statusCode).send({ name: error.name, message: error.message });
  } else if (err.name === 'MongoServerError') {
    error = new UniqueEmailError('Ошибка базы данных');
    res.status(error.statusCode).send({ name: error.name, message: error.message });
  } else if (err.name === 'JsonWebTokenError') {
    error = new AuthError('Ошибка авторизации');
    res.status(error.statusCode).send({ name: error.name, message: error.message });
  } else if (err.statusCode === undefined) {
    res.status(500).send({ name: 'InternalServer', message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ name: err.name, message: err.message });
  }

  next();
};

module.exports = errorHandler;
