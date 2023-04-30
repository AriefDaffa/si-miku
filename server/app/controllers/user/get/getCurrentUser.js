const jwt = require('jsonwebtoken');

const getCurrentUser = async (req, res) => {
  try {
    const cookies = req.cookies.accessToken;

    if (!cookies) {
      return res.sendStatus(401);
    }

    // verify the jwt token inside cookies
    jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
      if (err) {
        return res.sendStatus(403);
      }

      return res.json({
        username: decodedVal.username,
        email: decodedVal.email,
        userImage: decodedVal.user_image,
      });
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getCurrentUser;
