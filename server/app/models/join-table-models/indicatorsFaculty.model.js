const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const IndicatorFaculty = db.define(
  'indicator_faculties',
  {
    indicator_faculty_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { IndicatorFaculty };
