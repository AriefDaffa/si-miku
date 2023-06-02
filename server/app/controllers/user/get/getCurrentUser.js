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

      let role = '';

      if (decodedVal.role_id === 1) {
        role = 'Manajemen';
      } else if (decodedVal.role_id === 2) {
        role = 'Operator';
      } else if (decodedVal.role_id === 9) {
        role = 'Admin';
      }

      return res.json({
        profession: decodedVal.profession,
        email: decodedVal.email,
        userImage: decodedVal.user_image,
        role,
      });
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getCurrentUser;
