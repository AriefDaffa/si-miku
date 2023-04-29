const model = require('../../models');

const getAllDepartment = async (req, res) => {
  try {
    const { year_value } = req.query;

    const department = await model.Department.findAll({
      //   attributes: ['department_id', 'department_name'],
      //   include: {
      //     model: model.IndicatorsDepartment,
      //     attributes: ['indicator_department_id'],
      //     include: [
      //       {
      //         model: model.Indicator,
      //       },
      //       { model: model.TargetQuarters },
      //       {
      //         model: model.Year,
      //         where: {
      //           year_value,
      //         },
      //       },
      //     ],
      //   },
    });

    res.json(department);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllDepartment;
