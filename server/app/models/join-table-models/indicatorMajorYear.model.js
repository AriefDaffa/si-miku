const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const IndicatorMajorYear = db.define(
  'indicator_major_years',
  {
    indicator_major_year_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { IndicatorMajorYear };
