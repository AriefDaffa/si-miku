const model = require('../models');

const registerUser = async (req, res) => {
  const { user_name, user_email, role_id, password } = req.body;

  if (!user_name || !user_name || !role_id || !password) {
    return res.json({ message: `Missing field` });
  }

  try {
    // check if there is duplicate email
    const user = await model.user.findOne({
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

    await model.user.create({
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

const getUsers = async (req, res) => {
  try {
    const users = await model.user.findAll({
      include: {
        model: model.role,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserByRole = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await model.role.findOne({
      where: {
        id,
      },
      include: model.user,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await model.role.findAll();

    res.json(roles);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, getUserByRole, getRoles, registerUser };
