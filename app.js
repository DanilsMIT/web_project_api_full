const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Auth
const { createUser, loginUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const PORT = 3001;
app.use(cors());
mongoose.connect("mongodb://localhost:27017/aroundMongoose");
app.use(express.json());

//Routes públicas
app.post("/signup", createUser);
app.post("/signin", loginUser);

//Routes
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
//auth
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

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
