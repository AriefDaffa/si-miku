const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Jurusan = db.define('majors', {
  major_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  major_name: {
    type: DataTypes.STRING,
  },
});

module.exports = { Jurusan };
