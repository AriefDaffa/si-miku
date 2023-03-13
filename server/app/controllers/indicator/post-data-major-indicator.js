const model = require('../../models');

const postDataMajorIndicator = async (req, res) => {
  try {
    const { indicator_id, major_id, indicator_major_data } = req.body;
    const { q1, q2, q3, q4, target_value, year_value } = indicator_major_data;

    const total = q1 + q2 + q3 + q4;
    const is_target_fulfilled = total === 0 ? false : total >= target_value;
    let year_id = 0;

    console.log(is_target_fulfilled);

    // --- check if the indicator is available -- //
    const checkIndicator = await model.Indicator.findOne({
      where: {
        indicator_id,
      },
    });

    if (!checkIndicator) {
      return res.status(404).json({ message: 'Indicator Not Found!' });
    }

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
    });

    if (!findYear) {
      const createdYear = await model.Year.create({
        year_value,
      });

      year_id = createdYear.year_id;
    } else {
      year_id = findYear.year_id;
    }

    const majorIndicator = await model.MajorIndicator.findOne({
      where: {
        indicator_id,
        major_id,
      },
    });

    const targetQuarter = await model.TargetQuarters.create({
      target_value,
      q1,
      q2,
      q3,
      q4,
      is_target_fulfilled,
    });

    await model.MajorIndicatorYear.create({
      year_id,
      major_indicator_id: majorIndicator.major_indicator_id,
      target_quarter_id: targetQuarter.target_quarter_id,
    });

    return res.json({ message: 'Data successfully created' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = postDataMajorIndicator;
