/* eslint-disable linebreak-style */
const { Joi } = require('celebrate');
const regexImageUrl = require('./constants');

const validPostCreateCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexImageUrl),
  }),
};

const validDeleteDeleteCard = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

const validPutLikeCard = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

const validDeleteDislikeCard = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};
module.exports = {
  validPostCreateCard,
  validDeleteDeleteCard,
  validPutLikeCard,
  validDeleteDislikeCard,

};
