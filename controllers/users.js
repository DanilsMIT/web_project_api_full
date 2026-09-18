const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} = require("./errors/responseErrors");

//Metodos
//Register
const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ email, password: hash, name, about, avatar });
    })
    .then((user) => {
      res.status(201).send({
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError());
      } else if (err.code === 11000) {
        next(new ConflictError());
      } else {
        next(err);
      }
    });
};

//Login
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "vip-token", {
        expiresIn: "7d",
      });
      res.send(token);
    })
    .catch((err) => {
      next(new UnauthorizedError());
    });
};

module.exports = { createUser, loginUser };
