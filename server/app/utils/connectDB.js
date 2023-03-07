const db = require('../config/db.config.js');
const model = require('../models/index.js');

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');
    // await model.db.sync({ alter: true });

    // uncomment this line if we want to generate the table
    // await model.db.sync({ force: true }).then(() => {
    // model.Role.create({
    //   role_id: 1,
    //   role_name: 'Manajemen',
    // });
    // model.Role.create({
    //   role_id: 2,
    //   role_name: 'Operator',
    // });
    // });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
