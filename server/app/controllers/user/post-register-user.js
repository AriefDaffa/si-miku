const model = require('../../models');

const registerUser = async (req, res) => {
  const { user_name, user_email, role_id, password } = req.body;

  if (!user_name || !user_name || !role_id || !password) {
    return res.json({ message: `Missing field` });
  }

  try {
    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_email,
      },
      attributes: ['user_email'],
    });

    if (user) {
      return res.json({
        message: `user with email ${user_email} already exist`,
      });
    }

    await model.User.create({
      user_name,
      user_email,
      password,
      role_id,
    });

    res.json({ message: 'User Created!' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = registerUser;
