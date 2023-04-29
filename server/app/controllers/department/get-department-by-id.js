const model = require('../../models');

const getDepartmentByID = async (req, res) => {
  try {
    const { id } = req.params;

    const { page, size, keyword } = req.query;

    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    const department = await model.Department.findOne({
      where: {
        department_id: id,
      },
      // include: {
      //   model: model.IndicatorsDepartment,
      //   include: [
      //     {
      //       model: model.Indicator,
      //       where: {
      //         indicator_type: [2, 4],
      //       },
      //     },
      //     {
      //       model: model.TargetDeps,
      //       include: {
      //         model: model.TargetQuarters,
      //         include: model.Year,
      //       },
      //     },
      //   ],
      // },
    });

    const indicatorDeps = await model.IndicatorsDepartment.findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: {
        department_id: id,
      },
      include: [
        {
          model: model.Indicator,
          where: {
            indicator_type: [2, 4],
          },
        },
        {
          model: model.TargetDeps,
          include: {
            model: model.TargetQuarters,
            include: model.Year,
            // where: {
            //   year_id: 2,
            // },
          },
        },
      ],
    });

    const response = {
      department_id: department.department_id,
      department_name: department.department_name,
      department_image: department.department_image,
      total_data: indicatorDeps.count,
      total_page: Math.ceil(indicatorDeps.count / limit),
      current_page: page ? +page : 0,
      indicator_departments: indicatorDeps.rows,
    };

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getDepartmentByID;
