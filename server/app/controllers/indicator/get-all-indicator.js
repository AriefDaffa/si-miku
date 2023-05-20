const { Op } = require('sequelize');
const model = require('../../models');

const getAllIndicators = async (req, res) => {
  const { page, size, keyword } = req.query;

  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  try {
    const indicator = await model.Indicator.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          { indicator_name: { [Op.like]: `%${keyword}%` } },
          { indicator_code: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    const normalizeResponse = {
      total_data: indicator.count,
      total_page: Math.ceil(indicator.count / limit),
      current_page: page ? +page : 0,
      indicator_list: indicator.rows,
    };

    res.json(normalizeResponse);

    // {
    //   include: [
    //     {
    //       model: model.IndicatorsDepartment,
    //       attributes: ['indicator_department_id'],
    //       include: [
    //         {
    //           model: model.Department,
    //           attributes: ['department_id', 'department_name'],
    //         },
    //         {
    //           model: model.TargetQuarters,
    //         },
    //       ],
    //     },
    //     {
    //       model: model.IndicatorsFaculty,
    //       attributes: ['indicator_faculty_id'],
    //       include: [
    //         {
    //           model: model.Faculty,
    //           attributes: ['faculty_id', 'faculty_name'],
    //         },
    //         {
    //           model: model.TargetQuarters,
    //         },
    //       ],
    //     },
    //     {
    //       model: model.IndicatorsMajor,
    //       attributes: ['indicator_major_id'],
    //       include: [
    //         {
    //           model: model.Major,
    //           // attributes: ['major', 'faculty_name'],
    //         },
    //         {
    //           model: model.TargetQuarters,
    //         },
    //       ],
    //     },
    //   ],
    //   attributes: ['indicator_id', 'indicator_name', 'indicator_code'],
    // }

    // res.json(indicator);

    //   const indicator = await model.Indicator.findAndCountAll({
    //     // limit,
    //     // offset,
    //     distinct: true,
    //     attributes: [
    //       'indicator_id',
    //       'indicator_code',
    //       'indicator_name',
    //       'is_faculty_indicator',
    //     ],
    //     include: [
    //       {
    //         model: model.MajorIndicator,
    //         attributes: ['major_indicator_id'],
    //         include: {
    //           model: model.MajorIndicatorYear,
    //           attributes: ['major_indicator_year_id'],
    //           include: {
    //             model: model.TargetQuarters,
    //             attributes: ['is_target_fulfilled'],
    //           },
    //         },
    //       },
    //       {
    //         model: model.FacultyIndicator,
    //         attributes: ['faculty_indicator_id'],
    //         include: {
    //           model: model.TargetQuarters,
    //           attributes: ['is_target_fulfilled'],
    //         },
    //       },
    //     ],
    //   });

    //   const normalize = {
    //     // total_page: Math.ceil(indicator.count / limit),
    //     // total_data: indicator.count,
    //     // current_page: page ? +page : 0,
    //     indicator_list: indicator.rows
    //       .map((item) => {
    //         const facultyCount = item.faculty_indicators.reduce(
    //           (acc, cur) => {
    //             if (cur.target_quarter.is_target_fulfilled === true) {
    //               acc.fulfilled += 1;
    //             } else if (cur.target_quarter.is_target_fulfilled === false) {
    //               acc.failed += 1;
    //             }

    //             return acc;
    //           },
    //           { failed: 0, fulfilled: 0 }
    //         );

    //         const majorCount = item.major_indicators.reduce(
    //           (acc, cur) => {
    //             cur.major_indicator_years.map((item) => {
    //               if (item.target_quarter.is_target_fulfilled === true) {
    //                 acc.fulfilled += 1;
    //               } else if (item.target_quarter.is_target_fulfilled === false) {
    //                 acc.failed += 1;
    //               }
    //             });

    //             return acc;
    //           },
    //           {
    //             failed: 0,
    //             fulfilled: 0,
    //           }
    //         );

    //         return {
    //           indicator_id: item.indicator_id,
    //           indicator_name: item.indicator_name,
    //           indicator_code: item.indicator_code,
    //           is_faculty_indicator: item.is_faculty_indicator,
    //           count: item.is_faculty_indicator ? facultyCount : majorCount,
    //         };
    //       })
    //       .sort((a, b) => a.indicator_id - b.indicator_id),
    //   };

    //   res.json(normalize);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllIndicators;
