const model = require('../../models');

const getIndicatorsByYear = async (req, res) => {
  const { id } = req.params;

  try {
    const year = await model.Year.findOne({
      where: {
        year_value: id,
      },
      include: {
        model: model.IndicatorMajorYear,
        attributes: ['indicator_major_year_id'],
        include: [
          {
            model: model.IndicatorMajor,
            attributes: ['indicator_major_id'],
            include: [
              {
                model: model.Indicator,
                attributes: ['indicator_code', 'indicator_name'],
              },
              { model: model.Major },
            ],
          },
          model.TargetQuarters,
        ],
      },
    });

    if (!year) {
      return res.status(404).json({ message: 'Error! Year not found' });
    }

    res.json(year);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorsByYear;
