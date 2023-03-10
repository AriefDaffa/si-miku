const jwt = require('jsonwebtoken');

const authStatus = async (req, res) => {
  try {
    const cookies = req.cookies.accessToken;

    let isManagement = false;
    let isAuthenticated = true;

    if (!cookies) {
      return res.sendStatus(401);
    }

    // verify the jwt token inside cookies
    jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
      if (err) {
        isAuthenticated = false;
        return res.sendStatus(403);
      }

      if (decodedVal.role_id === 1) {
        isManagement = true;
      }
    });

    res.json({ isAuthenticated, isManagement });
  } catch (error) {
    res.json(error);
  }
};

module.exports = authStatus;
