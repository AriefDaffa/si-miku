const { DataTypes } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');
const db = require('../config/db.config.js');

const User = db.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profession: {
    type: DataTypes.STRING,
  },
  user_email: {
    type: DataTypes.STRING,
    unique: true,
  },
  user_image: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

useBcrypt(User, {
  field: 'password',
  rounds: 12,
  compare: 'authenticate',
});

module.exports = { User };
