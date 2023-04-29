const { DataTypes } = require('sequelize');
const db = require('../../config/db.config.js');

const TargetFaculty = db.define(
  'target_faculties',
  {
    target_faculty_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

module.exports = { TargetFaculty };
