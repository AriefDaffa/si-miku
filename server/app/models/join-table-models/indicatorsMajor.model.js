const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const IndicatorsMajor = db.define(
  'indicator_majors',
  {
    indicator_major_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { IndicatorsMajor };
