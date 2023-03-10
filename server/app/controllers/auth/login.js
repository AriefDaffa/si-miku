const model = require('../../models');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { user_email, password } = req.body;

  try {
    const user = await model.User.findOne({
      where: {
        user_email,
      },
    });

    if (user === null) {
      return res
        .status(400)
        .json({ message: 'Login failed, please check your email or password' });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // create jwt
    const accessToken = jwt.sign(
      {
        username: user.user_name,
        email: user.user_email,
        user_id: user.user_id,
        role_id: user.role_id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    );

    // set http-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login Berhasil!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = loginUser;
