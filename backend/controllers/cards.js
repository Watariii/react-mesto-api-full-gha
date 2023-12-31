const Card = require('../models/card');

const NotFoundError = require('../errors/error-not-found');
const AllowsRightError = require('../errors/error-allows-right');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};
const createCard = (req, res, next) => {
  Card.create({
    owner: req.user._id,
    name: req.body.name,
    link: req.body.link,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};
const deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId }).orFail(() => new NotFoundError('Карточка с таким id не найдена'))
    .then((data) => {
      if (String(data.owner) === String(req.user._id)) {
        data.deleteOne();
        return res.status(200).send(data);
      }
      throw new AllowsRightError('Невозможно удалить чужую карточку');
    }).catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
