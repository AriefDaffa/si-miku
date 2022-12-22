const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Role = db.define('roles', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
  },
});

module.exports = Role;
