const { DataTypes } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');
const db = require('../config/db.config.js');

const User = db.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
  },
  user_email: {
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
