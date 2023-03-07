const model = require('../../models');

const getTargetQuarterByYear = async (req, res) => {
  try {
    const targetSuccess = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        include: {
          model: model.TargetQuarters,
          where: {
            is_target_fulfilled: true,
          },
        },
      },
    });

    const targetFailed = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        include: {
          model: model.TargetQuarters,
          where: {
            is_target_fulfilled: false,
          },
        },
      },
    });

    res.json({
      failed_target: targetFailed.map((data) => {
        return {
          year_id: data.year_id,
          year_value: data.year_value,
          total: data.indicator_major_years.length,
        };
      }),
      success_target: targetSuccess.map((data) => {
        return {
          year_id: data.year_id,
          year_value: data.year_value,
          total: data.indicator_major_years.length,
        };
      }),
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = getTargetQuarterByYear;
