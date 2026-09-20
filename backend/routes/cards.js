const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL, validateMongoId } = require("../utils/validatorFunctions");
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().custom(validateURL),
    }),
  }),
  postCard,
);
router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().custom(validateMongoId),
    }),
  }),
  deleteCard,
);
router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().custom(validateMongoId),
    }),
  }),
  likeCard,
);
router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().custom(validateMongoId),
    }),
  }),
  dislikeCard,
);

module.exports = router;
