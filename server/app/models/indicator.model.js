const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Indicator = db.define('indicators', {
  indicator_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  indicator_code: {
    type: DataTypes.STRING,
    unique: true,
  },
  indicator_name: {
    type: DataTypes.STRING,
  },
});

module.exports = { Indicator };
