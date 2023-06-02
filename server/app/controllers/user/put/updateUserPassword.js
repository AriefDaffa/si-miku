const jwt = require('jsonwebtoken');
const model = require('../../../models');

const updateUserPassword = async (req, res) => {
  try {
    const { user_email, password } = req.body;

    const file =
      req.file !== undefined ? 'images/profile/' + req.file.filename : '';

    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_email,
      },
      attributes: ['user_id', 'user_email', 'profession', 'role_id'],
    });

    if (!user) {
      return res.status(404).send({ message: 'Error! User not found!' });
    }

    if (password) {
      user.password = password;
    }

    user.user_image = file;

    await user.save();

    const accessToken = jwt.sign(
      {
        profession: user.profession,
        email: user.user_email,
        user_id: user.user_id,
        role_id: user.role_id,
        user_image: file,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    );

    // // set http-only cookie
    await res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateUserPassword;
