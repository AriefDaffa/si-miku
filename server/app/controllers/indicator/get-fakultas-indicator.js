const model = require('../../models');

const getFakultasIndicators = async (req, res) => {
  // const { page, size } = req.query;

  // const limit = size ? +size : 3;
  // const offset = page ? page * limit : 0;

  try {
    const indicator = await model.Indicator.findAndCountAll({
      // limit,
      // offset,
      where: {
        is_faculty_indicator: true,
      },
      distinct: true,
      attributes: [
        'indicator_id',
        'indicator_code',
        'indicator_name',
        'is_faculty_indicator',
      ],
      include: {
        model: model.FacultyIndicator,
        attributes: ['faculty_indicator_id'],
        include: {
          model: model.TargetQuarters,
          attributes: ['is_target_fulfilled'],
        },
      },
    });

    const normalize = {
      // total_page: Math.ceil(indicator.count / limit),
      total_data: indicator.count,
      ...indicator.rows.reduce(
        (acc, cur, idx) => {
          const result = {
            indicator_id: cur.indicator_id,
            indicator_code: cur.indicator_code,
            indicator_name: cur.indicator_name,
            is_faculty_indicator: cur.is_faculty_indicator,
            count: {
              failed: 0,
              fulfilled: 0,
            },
          };

          acc.indicator_list.push(result);

          cur.faculty_indicators.map((item) => {
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

module.exports = getFakultasIndicators;
