const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/error-not-found');
const AuthError = require('../errors/error-auth');
const UniqueEmailError = require('../errors/error-unique-email');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

// getUserById and userInfo
const getUser = (req, res, next) => {
  User.findById(req.params.id || req.user._id)
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({
        ...req.body,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send(user.hidePass());
        })
        .catch(() => {
          next(new UniqueEmailError('Ошибка базы данных'));
        });
    })
    .catch((next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    // отменяет select false для пароля это нужно для сравнения hash
    // пароля в user, который был скрыт select
    .select('+password')
    .orFail(() => new AuthError('Авторизация с несуществующими email и password в БД'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: 6048000 });
            res.cookie('jwt', token, {
              maxAge: 6048000,
              httpOnly: true,
              sameSite: true,
              secure: false,
            });
            req.user = { user };
            res.status(200).send({ data: user.hidePass() });
          } else {
            throw new AuthError('Неверная почта или пароль');
          }
        }).catch((next));
    })
    .catch((next));
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
    new: true,
  })
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(() => new NotFoundError('Пользователь с таким id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
