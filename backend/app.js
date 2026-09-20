const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//registro Logs
const { requestLogger, errorLogger } = require("./middlewares/logger");
//Validator
const { celebrate, Joi, errors } = require("celebrate");
const { validateURL } = require("./utils/validatorFunctions");
// Authentication
const { createUser, loginUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const PORT = 3001;
app.use(cors());
mongoose.connect("mongodb://localhost:27017/aroundMongoose");
app.use(express.json());
app.use(requestLogger);

//Routes públicas
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  createUser,
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  loginUser,
);

//Routes
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
//auth
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

//Manejo de errores Celebrate-Validator y logger
app.use(errorLogger);
app.use(errors());
//Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});
//Middleware Server Error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? "Se ha producido un error en el servidor"
        : err.message,
  });
});
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
