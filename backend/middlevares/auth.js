const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = auth;
