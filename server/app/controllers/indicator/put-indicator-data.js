const model = require('../../models');

const updateIndicatorData = async (req, res) => {
  try {
    const { id } = req.params;
    const { target_quarter_id, q1, q2, q3, q4, target_value } = req.body;

    const total = q1 + q2 + q3 + q4;
    const is_target_fulfilled = total === 0 ? false : total >= target_value;

    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
    });

    if (!indicator) {
      return res.status(404).json({ message: 'Error! Indicator not found' });
    }

    const dataIndicator = await model.TargetQuarters.findOne({
      where: {
        target_quarter_id,
      },
    });

    if (!dataIndicator) {
      return res
        .status(404)
        .json({ message: 'Error! Data indicator not found' });
    }

    dataIndicator.target_value = target_value;
    dataIndicator.q1 = q1;
    dataIndicator.q2 = q2;
    dataIndicator.q3 = q3;
    dataIndicator.q4 = q4;
    dataIndicator.is_target_fulfilled = is_target_fulfilled;

    await dataIndicator.save();

    res.json(dataIndicator);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateIndicatorData;
