require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const cookies = req.cookies.accessToken;

  if (!cookies) {
    return res.sendStatus(401);
  }

  // verify the jwt token inside cookies
  jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.email = decodedVal.email;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  // use cookies for auth
  const cookies = req.cookies.refreshToken;

  if (!cookies) {
    return res.sendStatus(401);
  }

  // verify the jwt token inside cookies
  jwt.verify(cookies, process.env.REFRESH_TOKEN_SECRET, (err, decodedVal) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.email = decodedVal.email;
    next();
  });
};

module.exports = { verifyRefreshToken, verifyAccessToken };
