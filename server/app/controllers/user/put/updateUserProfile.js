const jwt = require('jsonwebtoken');
const model = require('../../../models');

const updateUserProfile = async (req, res) => {
  try {
    const { user_email } = req.body;

    const file =
      req.file !== undefined ? 'images/profile/' + req.file.filename : '';

    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_email,
      },
      attributes: ['user_id', 'user_email', 'user_name', 'role_id'],
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    user.user_image = file;

    await user.save();

    const accessToken = jwt.sign(
      {
        username: user_name,
        email: user.user_email,
        user_id: user.user_id,
        role_id: user.role_id,
        user_image: file,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    );

    // set http-only cookie
    await res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'none',
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateUserProfile;
