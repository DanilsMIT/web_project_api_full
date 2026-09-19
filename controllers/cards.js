const Cards = require("../models/card");
const {
  BadRequestError,
  notFoundError,
  ForbiddenError,
} = require("../errors/responseErrors");

// Get cards
const getCards = async (req, res, next) => {
  try {
    const cards = await Cards.find({}).sort({ createdAt: -1 });
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err);
  }
};

// Post Card
const postCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Cards.create({ name, link, owner });
    res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

//Delete Card
const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Cards.findById(cardId);
    if (!card) {
      return next(new notFoundError());
    }

    if (card.owner.toString() !== req.user._id) {
      return next(new ForbiddenError());
    }
    await Cards.findByIdAndDelete(cardId);
    res.status(200).send({ data: card });
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

// Like Card
const likeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return next(new notFoundError());
    }
    res.status(200).send({ data: card });
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

// Unlike card
const dislikeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return next(new notFoundError());
    }
    res.status(200).send({ data: card });
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

module.exports = { getCards, postCard, deleteCard, likeCard, dislikeCard };
