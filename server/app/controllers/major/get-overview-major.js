const model = require('../../models');

const getOverviewMajor = async (req, res) => {
  try {
    const majors = await model.Major.findAll({
      include: {
        model: model.MajorIndicator,
        attributes: ['major_indicator_id'],
        include: {
          model: model.MajorIndicatorYear,
          attributes: ['major_indicator_year_id'],
          include: {
            model: model.TargetQuarters,
            attributes: ['is_target_fulfilled'],
          },
        },
      },
    });

    const normalize = majors.reduce(
      (acc, cur, idx) => {
        acc.major_list.push({
          major_id: cur.major_id,
          major_name: cur.major_name,
          major_image: cur.major_image,
          count: {
            fulfilled: 0,
            failed: 0,
          },
        });

        cur.major_indicators.map((item) => {
          item.major_indicator_years.map((data) => {
            if (data.target_quarter.is_target_fulfilled === true) {
              acc.total_fulfilled += 1;
              acc.major_list[idx].count.fulfilled += 1;
            } else if (data.target_quarter.is_target_fulfilled === false) {
              acc.total_failed += 1;
              acc.major_list[idx].count.failed += 1;
            }
          });
        });

        return acc;
      },
      { total_fulfilled: 0, total_failed: 0, major_list: [] }
    );

    res.json(normalize);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getOverviewMajor;
