require('dotenv').config();
const jwt = require('jsonwebtoken');
const model = require('../models');

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

const getUsers = async (req, res) => {
  try {
    const users = await model.User.findAll({
      include: {
        role_id: 2,
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
    const user = await model.Role.findOne({
      where: {
        id,
      },
      include: model.User,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await model.Role.findAll();

    res.json(roles);
  } catch (error) {
    console.log(error);
  }
};

const getUserRole = async (req, res) => {
  try {
    const cookies = req.cookies.accessToken;

    if (!cookies) {
      return res.sendStatus(401);
    }

    jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
      if (err) {
        return res.sendStatus(403);
      }

      return res.json({
        role_id: decodedVal.role_id,
      });
    });
  } catch (error) {
    res.json(error);
  }
};

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

module.exports = {
  getUsers,
  getUserByRole,
  getRoles,
  registerUser,
  getCurrentUser,
  getUserRole,
};
