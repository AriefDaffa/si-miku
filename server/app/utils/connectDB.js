const db = require('../config/db.config.js');
const model = require('../models/index.js');

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');

    // // uncomment this line if we want to generate the table
    // await model.db.sync({ force: true }).then(() => {});
    // //create role
    // await model.Role.create({
    //   role_id: 1,
    //   role_name: 'Manajemen',
    // });
    // await model.Role.create({
    //   role_id: 2,
    //   role_name: 'Operator',
    // });

    // //create department
    // await model.Department.bulkCreate([
    //   {
    //     department_id: 1,
    //     department_name: 'Teknik Informatika',
    //     department_image: 'images/logo/1676855813360-tif-logo.png',
    //   },
    //   {
    //     department_id: 2,
    //     department_name: 'Sistem Informasi',
    //     department_image: 'images/logo/1676855937266-si-logo.png',
    //   },
    // ]);

    // //create faculty
    // await model.Faculty.create({
    //   faculty_id: 1,
    //   faculty_name: 'Fakultas Ilmu Komputer',
    //   faculty_image: '',
    // });

    // //create majors
    // await model.Major.bulkCreate([
    //   {
    //     major_id: 1,
    //     major_name: 'Teknik Informatika',
    //     major_image: 'images/logo/1676855813360-tif-logo.png',
    //     department_id: 1,
    //   },
    //   {
    //     major_id: 2,
    //     major_name: 'Teknik Komputer',
    //     major_image: 'images/logo/1676855895080-tekkom-logo.png',
    //     department_id: 1,
    //   },
    //   {
    //     major_id: 3,
    //     major_name: 'Sistem Informasi',
    //     major_image: 'images/logo/1676855937266-si-logo.png',
    //     department_id: 2,
    //   },
    //   {
    //     major_id: 4,
    //     major_name: 'Teknologi Informasi',
    //     major_image: 'images/logo/1676856169481-ti-logo.png',
    //     department_id: 2,
    //   },
    //   {
    //     major_id: 5,
    //     major_name: 'Pendidikan Teknologi Informasi',
    //     major_image: 'images/logo/1676856181250-pti-logo.png',
    //     department_id: 2,
    //   },
    //   {
    //     major_id: 6,
    //     major_name: 'Magister Ilmu Komputer',
    //     major_image: 'images/logo/1676856195221-mik-logo.png',
    //     department_id: 1,
    //   },
    // ]);

    // //create supervisor
    // await model.Supervisor.bulkCreate([
    //   { supervisor_id: 1, supervisor_name: 'Wakil Dekan I' },
    //   { supervisor_id: 2, supervisor_name: 'Wakil Dekan II' },
    //   { supervisor_id: 3, supervisor_name: 'Wakil Dekan III' },
    // ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
