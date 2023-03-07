const model = require('../../models');

const getIndicatorByMajorId = async (req, res) => {
  const { id } = req.params;

  try {
    const indicator = await model.Major.findOne({
      where: {
        major_id: id,
      },
      include: {
        model: model.IndicatorMajor,
        attributes: ['indicator_major_id'],
        include: [
          {
            model: model.Indicator,
            attributes: ['indicator_id', 'indicator_code', 'indicator_name'],
          },
          {
            model: model.IndicatorMajorYear,
            attributes: ['indicator_major_year_id'],
            include: [
              {
                model: model.Year,
              },
              model.TargetQuarters,
            ],
          },
        ],
      },
    });

    const normalizeResult = {
      major_id: indicator.major_id,
      major_name: indicator.major_name,
      major_image: indicator.major_image,
      indicator_majors: indicator.indicator_majors.map((data) => {
        return {
          indicator_id: data.indicator.indicator_id,
          indicator_code: data.indicator.indicator_code,
          indicator_name: data.indicator.indicator_name,
          year_data: data.indicator_major_years.map((year) => {
            return {
              year_id: year.year.year_id,
              year_value: year.year.year_value,
              q1: year.target_quarter.q1,
              q2: year.target_quarter.q2,
              q3: year.target_quarter.q3,
              q4: year.target_quarter.q4,
              target: year.target_quarter.target_value,
              is_target_fulfilled: year.target_quarter.is_target_fulfilled,
            };
          }),
        };
      }),
    };

    res.json(normalizeResult);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorByMajorId;
