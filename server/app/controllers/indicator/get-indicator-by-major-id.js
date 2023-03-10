const model = require('../../models');

const getIndicatorByMajorId = async (req, res) => {
  const { id } = req.params;

  try {
    const indicator = await model.Major.findOne({
      where: {
        major_id: id,
      },
      include: {
        model: model.MajorIndicator,
        attributes: ['major_indicator_id'],
        include: [
          {
            model: model.Indicator,
            attributes: [
              'indicator_id',
              'indicator_code',
              'indicator_name',
              'is_faculty_indicator',
            ],
          },
          {
            model: model.MajorIndicatorYear,
            attributes: ['major_indicator_year_id'],
            include: model.TargetQuarters,
          },
        ],
      },
    });

    const normalize = {
      major_id: indicator.major_id,
      major_name: indicator.major_name,
      major_image: indicator.major_image,
      ...indicator.major_indicators.reduce(
        (acc, cur, idx) => {
          acc.indicator_list.push({
            indicator_id: cur.indicator.indicator_id,
            indicator_code: cur.indicator.indicator_code,
            indicator_name: cur.indicator.indicator_name,
            is_faculty_indicator: cur.indicator.is_faculty_indicator,
            count: {
              failed: 0,
              fulfilled: 0,
            },
          });

          cur.major_indicator_years.map((item) => {
            if (item.target_quarter.is_target_fulfilled === true) {
              acc.total_fulfilled += 1;
              acc.indicator_list[idx].count.fulfilled += 1;
            } else if (item.target_quarter.is_target_fulfilled === false) {
              acc.total_failed += 1;
              acc.indicator_list[idx].count.failed += 1;
            }
          });

          return acc;
        },
        { total_fulfilled: 0, total_failed: 0, indicator_list: [] }
      ),
    };

    res.json(normalize);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorByMajorId;
