const model = require('../../models');

const updateIndicatorType = async (req, res) => {
  try {
    const { id } = req.params;
    const { indicator_type } = req.body;

    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
    });

    indicator.indicator_type = indicator_type;

    await indicator.save();

    res.json(indicator);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateIndicatorType;
