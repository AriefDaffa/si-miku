const jwt = require('jsonwebtoken');
const model = require('../../models');

const updateUserProfile = async (req, res) => {
  // res.json(req.file);
  // const { filename } = req.file;

  try {
    const { user_name, user_email } = req.body;

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

    user.user_name = user_name;
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
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateUserProfile;
