const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  notFoundError,
  ConflictError,
} = require("../errors/responseErrors");

//Metodos auth
// Register
const createUser = async (req, res, next) => {
  try {
    const { email, password, name, about, avatar } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    res.status(201).send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError("El correo ya está registrado"));
    }
    if (err.name === "ValidationError") {
      next(new BadRequestError());
    }
    return next(err);
  }
};

// Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, "vip-token", { expiresIn: "7d" });
    res.send({ token });
  } catch {
    return next(new UnauthorizedError());
  }
};

// Current User (El perfil del usuario logueado)
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new notFoundError());
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

//Metodos de la db
// Get todos los usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ data: users });
  } catch (err) {
    next(err);
  }
};

// Get  usuario por ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new notFoundError());
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError("ID de usuario no válido"));
    } else {
      next(err);
    }
  }
};

// Patch User
const patchUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new notFoundError());
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

// Patch User-Avatar
const patchUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new notFoundError());
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      next(new BadRequestError());
    } else {
      next(err);
    }
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
};
