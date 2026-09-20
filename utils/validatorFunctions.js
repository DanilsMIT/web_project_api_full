const validator = require("validator");

const validateURL = (valor, manejoError) => {
  if (validator.isURL(valor)) {
    return valor;
  }
  return manejoError.error("string.uri");
};

const validateMongoId = (valor, manejoError) => {
  if (validator.isMongoId(valor)) {
    return valor;
  }
  return manejoError.error("string.hex");
};

module.exports = { validateURL, validateMongoId };
