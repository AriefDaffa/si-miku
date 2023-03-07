const model = require('../../models');

const getOverviewIndicator = async (req, res) => {
  try {
    const yearIndicator = await model.Year.findAll({
      include: [
        {
          model: model.FacultyIndicator,
          attributes: ['faculty_indicator_id'],
          include: model.TargetQuarters,
        },
        {
          model: model.MajorIndicatorYear,
          attributes: ['major_indicator_year_id'],
          include: model.TargetQuarters,
        },
      ],
    });

    const normalizedData = yearIndicator.reduce(
      (acc, cur) => {
        let fulfilled = 0;
        let failed = 0;

        cur.faculty_indicators.map((item) => {
          if (item.target_quarter.is_target_fulfilled === true) {
            acc.total_fulfilled += 1;
            fulfilled += 1;
          } else if (item.target_quarter.is_target_fulfilled === false) {
            acc.total_failed += 1;
            failed += 1;
          }
        });

        cur.major_indicator_years.map((item) => {
          if (item.target_quarter.is_target_fulfilled === true) {
            acc.total_fulfilled += 1;
            fulfilled += 1;
          } else if (item.target_quarter.is_target_fulfilled === false) {
            acc.total_failed += 1;
            failed += 1;
          }
        });

        acc.indicator_year.push({
          year_id: cur.year_id,
          year_value: cur.year_value,
          failed,
          fulfilled,
        });

        return acc;
      },
      { total_fulfilled: 0, total_failed: 0, indicator_year: [] }
    );

    res.json(normalizedData);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getOverviewIndicator;
