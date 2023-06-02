const model = require('../../../models');

const updateIndicator = async (req, res) => {
  const { id } = req.params;
  const { indicator_code, supervised_by, indicator_name } = req.body;

  try {
    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
    });

    if (!indicator) {
      return res.status(404).json({ message: 'Error! Indicator not found' });
    }

    indicator.indicator_code = indicator_code;
    indicator.supervised_by = supervised_by;
    indicator.indicator_name = indicator_name;

    await indicator.save();

    res.json(indicator);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateIndicator;
