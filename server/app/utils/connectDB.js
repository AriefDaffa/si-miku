const db = require('../config/db.config.js');
const model = require('../models/index.js');

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');
    // await model.db.sync({ alter: true });
    // uncomment this line if we want to generate the table
    // await model.db.sync({ force: true }).then(() => {
    // await model.role.create({
    //   role_id: 1,
    //   role_name: 'Manajemen',
    // });
    // await model.role.create({
    //   role_id: 2,
    //   role_name: 'Operator',
    // });
    // model.Indicator.bulkCreate([
    //   { indicator_name: 'test 1' },
    //   { indicator_name: 'test 2' },
    //   { indicator_name: 'test 3' },
    // ]);
    // model.Quarter.bulkCreate([
    //   { q1: 12, q2: 23, q3: 34, q4: 45 },
    //   { q1: 2, q2: 2, q3: 2, q4: 1 },
    //   { q1: 5, q2: 3, q3: 4, q4: 2 },
    // ]);
    // model.Year.create({
    //   year_Id: 2022,
    //   indicator_Id: 1,
    //   quarter_Id: 2,
    // });
    // model.Year.create({
    //   year_Id: 2022,
    //   indicator_Id: 2,
    //   quarter_Id: 3,
    // });
    // });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
