class BadRequestError extends Error {
  constructor(message = "Datos Inválidos en el formulario") {
    super(message);
    this.statusCode = 400;
  }
}
class UnauthorizedError extends Error {
  constructor(message = "Datos no coinciden") {
    super(message);
    this.statusCode = 401;
  }
}

class ConflictError extends Error {
  constructor(message = "Datos ya existentes en la base de datos") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { BadRequestError, UnauthorizedError, ConflictError };
