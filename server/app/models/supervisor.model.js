const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Supervisor = db.define(
  'supervisors',
  {
    supervisor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    supervisor_name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = { Supervisor };
