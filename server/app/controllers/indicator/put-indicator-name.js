const model = require('../../models');

const updateIndicatorName = async (req, res) => {
  const { id } = req.params;
  const { indicator_code, indicator_name } = req.body;
  // const { indicator_code, indicator_name, is_faculty_indicator } = data;

  try {
    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
    });

    if (!indicator) {
      return res.status(404).json({ message: 'Indicator not found' });
    }

    indicator.indicator_code = indicator_code;
    indicator.indicator_name = indicator_name;

    await indicator.save();

    res.json(indicator);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateIndicatorName;
