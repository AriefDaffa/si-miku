const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const TargetQuarters = db.define(
  'target_quarters',
  {
    target_quarter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    target_value: {
      type: DataTypes.INTEGER,
    },
    q1: {
      type: DataTypes.INTEGER,
    },
    q2: {
      type: DataTypes.INTEGER,
    },
    q3: {
      type: DataTypes.INTEGER,
    },
    q4: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = { TargetQuarters };
