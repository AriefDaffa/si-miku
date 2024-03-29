require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? `.env.dev` : '.env',
});
const { Sequelize } = require('sequelize');

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DB,
  DATABASE_DIALECT,
} = process.env;

const db = new Sequelize(DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
});

module.exports = db;
