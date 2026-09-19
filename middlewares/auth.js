const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/responseErrors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError());
  }

  const vipToken = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(vipToken, "vip-token");
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;
  next();
};

module.exports = auth;
