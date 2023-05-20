const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const TargetDeps = db.define(
  'target_deps',
  {
    target_dep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { TargetDeps };
