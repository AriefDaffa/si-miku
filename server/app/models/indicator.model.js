const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Indicator = db.define('indicators', {
  indicator_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  indicator_name: {
    type: DataTypes.STRING,
  },
});

const TargetAndQuarter = db.define(
  'target_quarters',
  {
    indicator_Value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    target: {
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

const Year = db.define('years', {
  year_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = { Indicator, TargetAndQuarter, Year };
