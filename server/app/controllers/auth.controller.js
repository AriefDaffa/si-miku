const model = require('../models');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { user_email, password } = req.body;

  try {
    const user = await model.user.findOne({
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
        role_id: user.role_id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    );

    // create jwt
    // const refreshToken = jwt.sign(
    //   {
    //     username: user.user_name,
    //     email: user.user_email,
    //   },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: '5h' }
    // );

    // set http-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    res.json({
      username: user.user_name,
      email: user.user_email,
    });
  } catch (error) {
    res.json(error);
  }
};

const logout = async (req, res) => {
  try {
    await res.cookie('accessToken', '', { maxAge: 0 });

    return res.json({ message: 'cookie cleared' });
  } catch (error) {
    return res.json(error);
  }
};

const authStatus = async (req, res) => {
  try {
    res.json({ isAuthenticated: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { loginUser, logout, authStatus };
