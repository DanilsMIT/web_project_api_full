const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL, validateMongoId } = require("../utils/validatorFunctions");
const {
  getCurrentUser,
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.get("/users", getUsers);
router.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().custom(validateMongoId),
    }),
  }),
  getUserById,
);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  patchUser,
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  patchUserAvatar,
);

module.exports = router;
