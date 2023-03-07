const model = require('../../models');

const deleteIndicatorById = async (req, res) => {
  try {
    const { indicator_id } = req.body;

    // const remove = await model.Indicator.destroy({
    //   where: {
    //     indicator_id,
    //   },
    // });

    const indicatorMajorId = await model.IndicatorMajor.findAll({
      where: {
        indicator_id,
      },
    });

    const indicatorMajorYear = await model.IndicatorMajorYear.findAll({
      where: {
        indicator_major_id: indicatorMajorId.map(
          (item) => item.indicator_major_id
        ),
      },
    });

    const remove = await model.Indicator.destroy({
      where: {
        indicator_id,
      },
    });

    const removeTargetQuarter = await model.TargetQuarters.destroy({
      where: {
        target_quarter_id: indicatorMajorYear.map(
          (item) => item.target_quarter_id
        ),
      },
    });

    if (remove === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteIndicatorById;
