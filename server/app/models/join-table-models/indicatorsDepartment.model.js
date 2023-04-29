const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const IndicatorDepartment = db.define(
  'indicator_departments',
  {
    indicator_department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { IndicatorDepartment };
