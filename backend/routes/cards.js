const router = require('express').Router();

const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validPostCreateCard,
  validDeleteDeleteCard,
  validPutLikeCard,
  validDeleteDislikeCard,
} = require('../utils/validRoutesCard');

router.get('/cards', getCards);

router.post('/cards', celebrate(validPostCreateCard), createCard);

router.delete('/cards/:cardId', celebrate(validDeleteDeleteCard), deleteCard);

router.put('/cards/:cardId/likes', celebrate(validPutLikeCard), likeCard);

router.delete('/cards/:cardId/likes', celebrate(validDeleteDislikeCard), dislikeCard);

module.exports = router;
