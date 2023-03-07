const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const FacultyIndicator = db.define(
  'faculty_indicators',
  {
    faculty_indicator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { FacultyIndicator };
