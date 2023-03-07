const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const MajorIndicatorYear = db.define(
  'major_indicator_years',
  {
    major_indicator_year_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { MajorIndicatorYear };
