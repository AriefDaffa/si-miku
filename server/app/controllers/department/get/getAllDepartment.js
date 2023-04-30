const model = require('../../../models');

const getAllDepartment = async (req, res) => {
  try {
    const department = await model.Department.findAll();

    res.json(department);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllDepartment;
