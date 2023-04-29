const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Faculty = db.define('faculties', {
  faculty_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  faculty_name: {
    type: DataTypes.STRING,
  },
  faculty_image: {
    type: DataTypes.STRING,
  },
});

module.exports = { Faculty };
