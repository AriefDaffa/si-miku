require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
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

const verifyManagement = (req, res, next) => {
  const cookies = req.cookies.accessToken;

  if (!cookies) {
    return res.sendStatus(401);
  }

  // verify the jwt token inside cookies
  jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
    if (err || decodedVal.role_id !== 2) {
      return res.sendStatus(403);
    }

    req.email = decodedVal.email;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const cookies = req.cookies.accessToken;

  if (!cookies) {
    return res.sendStatus(401);
  }

  // verify the jwt token inside cookies
  jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
    if (err || decodedVal.role_id !== 9) {
      return res.sendStatus(403);
    }

    req.email = decodedVal.email;
    next();
  });
};

module.exports = { verifyAccessToken, verifyManagement, verifyAdmin };
