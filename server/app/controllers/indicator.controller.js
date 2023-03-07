const model = require('../models');

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

const deleteIndicatorData = async (req, res) => {
  try {
    const { indicator_major_year_id } = req.body;

    const findMajorYear = await model.IndicatorMajorYear.findAll({
      where: {
        indicator_major_year_id,
      },
    });

    if (findMajorYear.length === 0) {
      return res.json({ message: 'Error! Data indikator tidak ditemukan' });
    }

    const removeMajorYear = await model.IndicatorMajorYear.destroy({
      where: {
        indicator_major_year_id,
      },
    });

    const removeTargetQuarter = await model.TargetQuarters.destroy({
      where: {
        target_quarter_id: findMajorYear.map((item) => item.target_quarter_id),
      },
    });

    if (removeMajorYear === 0 && removeTargetQuarter === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

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

const getYear = async (req, res) => {
  try {
    const year = await model.Year.findAll({
      attributes: ['year_value'],
    });

    return res.json(year);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  deleteIndicatorData,
  getYear, //
  deleteIndicatorById, //
  updateIndicatorName, //
};
