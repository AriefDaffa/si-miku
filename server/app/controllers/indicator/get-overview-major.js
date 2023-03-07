const model = require('../../models');

const getOverviewMajor = async (req, res) => {
  try {
    const majors = await model.Major.findAll({
      include: {
        model: model.IndicatorMajor,
        include: {
          model: model.IndicatorMajorYear,
          include: [model.TargetQuarters],
        },
      },
    });

    res.json(majors);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getOverviewMajor;
