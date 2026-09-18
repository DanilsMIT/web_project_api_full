const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    validate: { validator: (v) => validator.isEmail(v) },
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 15,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Formato URL invalido",
    },
  },
});

//metodos
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      //email incorrecto
      if (!user) {
        return Promise.reject(new Error("Correo o contraseña inválidos"));
      }
      //password incorrecto
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(new Error("Correo o contraseña inválidos"));
        }
        // todo correcto
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
