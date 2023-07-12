/* eslint-disable linebreak-style */
const { Joi } = require('celebrate');
const regexImageUrl = require('./constants');

const validPostCreateUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').regex(regexImageUrl),
  }),
};

const validPostLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const validGetGetUserById = {
  body: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
};

const validPatchUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const validPatchUpdateUserAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexImageUrl).required(),
  }),
};
module.exports = {
  validPostCreateUser,
  validPostLogin,
  validGetGetUserById,
  validPatchUpdateUser,
  validPatchUpdateUserAvatar,
};
