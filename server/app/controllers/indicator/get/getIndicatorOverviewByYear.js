const { Op } = require('sequelize');
const model = require('../../../models');

const getIndicatorOverviewByYear = async (req, res) => {
  try {
    const { year_value } = req.query;

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
      include: {
        model: model.TargetQuarters,
        include: {
          model: model.TargetFaculty,
          where: {
            target_faculty_id: { [Op.not]: null },
          },
          include: {
            model: model.IndicatorsFaculty,
          },
        },
      },
    });

    if (!findYear) {
      return res.json({
        year_id: 0,
        year_value: Number(year_value || 0),
        count: {
          fulfilled: 0,
          failed: 0,
        },
      });
    } else {
      return res.json({
        year_id: findYear.year_id,
        year_value: findYear.year_value,
        ...findYear.target_quarters.reduce(
          (acc, cur) => {
            if (cur.target_faculties.length > 0) {
              if (cur.is_target_fulfilled === true) {
                acc.count.fulfilled += 1;
              } else if (cur.is_target_fulfilled === false) {
                acc.count.failed += 1;
              }
            }

            return acc;
          },
          { count: { fulfilled: 0, failed: 0 } }
        ),
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorOverviewByYear;
