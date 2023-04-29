const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Department = db.define('departments', {
  department_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  department_name: {
    type: DataTypes.STRING,
  },
  department_image: {
    type: DataTypes.STRING,
  },
});

module.exports = { Department };
