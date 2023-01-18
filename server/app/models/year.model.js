const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Year = db.define(
  'years',
  {
    year_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year_value: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  { timestamps: false }
);

module.exports = { Year };
