const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const TargetMajor = db.define(
  'target_majors',
  {
    target_major_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { TargetMajor };
