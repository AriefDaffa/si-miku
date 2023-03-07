const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const MajorIndicator = db.define(
  'major_indicators',
  {
    major_indicator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { MajorIndicator };
