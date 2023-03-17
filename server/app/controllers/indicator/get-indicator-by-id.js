const model = require('../../models');

const getIndicatorById = async (req, res) => {
  const { id } = req.params;

  try {
    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
      attributes: [
        'indicator_id',
        'indicator_code',
        'indicator_name',
        'is_faculty_indicator',
      ],
      include: [
        {
          model: model.MajorIndicator,
          attributes: ['major_indicator_id'],
          include: [
            {
              model: model.MajorIndicatorYear,
              attributes: ['major_indicator_year_id'],
              include: [
                {
                  model: model.TargetQuarters,
                },
                { model: model.Year },
              ],
            },
            model.Major,
          ],
        },
        {
          model: model.FacultyIndicator,
          attributes: ['faculty_indicator_id'],
          include: [
            {
              model: model.TargetQuarters,
            },
            { model: model.Year },
          ],
        },
      ],
    });

    if (!indicator) {
      return res.status(404).json({ message: 'Error! Indicator not found' });
    }

    const normalizedData = {
      indicator_id: indicator.indicator_id,
      indicator_code: indicator.indicator_code,
      indicator_name: indicator.indicator_name,
      is_faculty_indicator: indicator.is_faculty_indicator,
      major_indicators: {
        count: indicator.major_indicators.reduce(
          (acc, cur) => {
            cur.major_indicator_years.map((item) => {
              if (item.target_quarter.is_target_fulfilled === true) {
                acc.fulfilled += 1;
              } else if (cur.target_quarter.is_target_fulfilled === false) {
                acc.failed += 1;
              }
            });
            return acc;
          },
          { fulfilled: 0, failed: 0 }
        ),
        data: indicator.major_indicators.map((item) => {
          return {
            major_id: item.major.major_id,
            major_name: item.major.major_name,
            major_image: item.major.major_image,
            major_data: item.major_indicator_years.map((data) => {
              return {
                target_quarter_id: data.target_quarter.target_quarter_id,
                year_id: data.year.year_id,
                year_value: data.year.year_value,
                target_value: data.target_quarter.target_value,
                q1: data.target_quarter.q1,
                q2: data.target_quarter.q2,
                q3: data.target_quarter.q3,
                q4: data.target_quarter.q4,
                is_target_fulfilled: data.target_quarter.is_target_fulfilled,
              };
            }),
          };
        }),
      },
      faculty_indicators: {
        count: indicator.faculty_indicators.reduce(
          (acc, cur) => {
            if (cur.target_quarter.is_target_fulfilled === true) {
              acc.fulfilled += 1;
            } else if (cur.target_quarter.is_target_fulfilled === false) {
              acc.failed += 1;
            }
            return acc;
          },
          { fulfilled: 0, failed: 0 }
        ),
        data: indicator.faculty_indicators.map((item) => {
          return {
            target_quarter_id: item.target_quarter.target_quarter_id,
            year_id: item.year.year_id,
            year_value: item.year.year_value,
            target_value: item.target_quarter.target_value,
            q1: item.target_quarter.q1,
            q2: item.target_quarter.q2,
            q3: item.target_quarter.q3,
            q4: item.target_quarter.q4,
            is_target_fulfilled: item.target_quarter.is_target_fulfilled,
          };
        }),
      },
    };

    res.json(normalizedData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getIndicatorById;
