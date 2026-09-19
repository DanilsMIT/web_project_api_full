const router = require("express").Router();
const {
  getCurrentUser,
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/me", patchUser);
router.patch("/users/me/avatar", patchUserAvatar);

module.exports = router;
