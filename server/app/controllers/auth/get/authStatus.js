const jwt = require('jsonwebtoken');

const authStatus = async (req, res) => {
  try {
    const cookies = req.cookies.accessToken;

    let roleId = 0;
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

      roleId = decodedVal.role_id;

      // if (decodedVal.role_id === 1) {
      //   isManagement = true;
      // }
    });

    res.json({ isAuthenticated, roleId });
  } catch (error) {
    res.json(error);
  }
};

module.exports = authStatus;
