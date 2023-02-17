const db = require('../config/db.config.js');
const model = require('../models/index.js');

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');
    // await model.db.sync({ alter: true });

    // uncomment this line if we want to generate the table
    // await model.db.sync({ force: true }).then(() => {
    //   model.Role.create({
    //     role_id: 1,
    //     role_name: 'Manajemen',
    //   });
    //   model.Role.create({
    //     role_id: 2,
    //     role_name: 'Operator',
    //   });
    // model.Major.bulkCreate([
    //   { major_id: 1, major_name: 'Teknik Informatika' },
    //   { major_id: 2, major_name: 'Teknik Komputer' },
    //   { major_id: 3, major_name: 'Sistem Informasi' },
    //   { major_id: 4, major_name: 'Teknologi Informasi' },
    //   { major_id: 5, major_name: 'Pendidikan Teknologi Informasi' },
    //   { major_id: 6, major_name: 'Magister Ilmu Komputer' },
    // ]);
    // });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
