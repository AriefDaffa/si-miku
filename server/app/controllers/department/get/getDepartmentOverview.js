const { Op } = require('sequelize');
const model = require('../../../models');

const getDepartmentOverview = async (req, res) => {
  try {
    let year_value = '2017,2018,2019,2029';

    // const yearValArray = year_value.split(',');

    // const findYear = await model.Year.findAll({
    //   include: {
    //     model: model.TargetQuarters,
    //     include: model.TargetFaculty,
    //   },
    // });

    // const normalizers = findYear.reduce((acc, cur) => {
    //   const { target_quarters, year_value } = cur;

    //   const array = target_quarters.reduce(
    //     (acc2, cur2) => {
    //       const { target_faculties, is_target_fulfilled } = cur2;

    //       if (target_faculties.length > 0) {
    //         if (is_target_fulfilled === true) {
    //           acc2.fulfilled += 1;
    //         } else if (is_target_fulfilled === false) {
    //           acc2.failed += 1;
    //         }
    //       }

    //       return acc2;
    //     },
    //     { fulfilled: 0, failed: 0 }
    //   );

    //   acc.push({ year_value, target_quarters: array });

    //   return acc;
    // }, []);

    const indicator = await model.Indicator.findAndCountAll({
      distinct: true,
      include: {
        model: model.IndicatorsFaculty,
        include: {
          model: model.TargetFaculty,
        },
      },
    });

    const normalizeResponse = {
      indicator_total: indicator.count,
      ...indicator.rows.reduce(
        (acc, cur) => {
          const { indicator_type } = cur;

          if (indicator_type === 4) {
            acc.indicator_department += 1;
            acc.indicator_major += 1;
          } else if (indicator_type === 2) {
            acc.indicator_department += 1;
          } else if (indicator_type === 3) {
            acc.indicator_major += 1;
          }

          return acc;
        },
        { indicator_department: 0, indicator_major: 0 }
      ),
      // year: normalizers,
    };

    res.json(normalizeResponse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getDepartmentOverview;
