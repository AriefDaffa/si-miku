const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Major = db.define(
  'majors',
  {
    major_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    major_name: {
      type: DataTypes.STRING,
    },
    major_image: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = { Major };
