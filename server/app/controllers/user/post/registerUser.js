const model = require('../../../models');

const registerUser = async (req, res) => {
  const { profession, user_email, role_id, password } = req.body;

  if (!profession || !user_email || !role_id || !password) {
    return res.json({ message: `Error! Missing field in the body` });
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
      return res.status(409).json({
        message: `Error! user with email ${user_email} already exist`,
      });
    }

    await model.User.create({
      profession,
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
