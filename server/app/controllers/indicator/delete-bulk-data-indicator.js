const model = require('../../models');

const deleteBulkDataIndicator = async (req, res) => {
  try {
    const { indicator } = req.body;
    // const { indicator_id, year_id, target_quarter_id } = req.body;

    const findIndicator = await model.Indicator.findOne({
      where: {
        indicator_id: indicator.map((item) => item.indicator_id),
      },
    });

    if (!findIndicator) {
      return res.status(404).send({ message: 'Error! Indicator not found!' });
    }

    const data = indicator.reduce(
      (acc, cur) => {
        acc.indicator_id.push(cur.indicator_id);
        acc.year_id.push(cur.year_id);
        acc.target_quarter_id.push(cur.target_quarter_id);

        return acc;
      },
      { indicator_id: [], year_id: [], target_quarter_id: [] }
    );

    if (findIndicator.is_faculty_indicator === true) {
      const deleteFaculty = await model.FacultyIndicator.destroy({
        where: data,
      });

      const targetQuarter = await model.TargetQuarters.destroy({
        where: {
          target_quarter_id: data.target_quarter_id,
        },
      });

      if (targetQuarter === 0 || deleteFaculty === 0) {
        return res.json({ message: 'Delete Error!' });
      } else {
        return res.json({ message: 'Indikator berhasil dihapus' });
      }
    } else if (findIndicator.is_faculty_indicator === false) {
      const deleteMajor = await model.MajorIndicatorYear.destroy({
        where: {
          year_id: data.year_id,
          target_quarter_id: data.target_quarter_id,
        },
      });

      const targetQuarter = await model.TargetQuarters.destroy({
        where: {
          target_quarter_id: data.target_quarter_id,
        },
      });

      if (targetQuarter === 0 || deleteMajor === 0) {
        return res.json({ message: 'Delete Error!' });
      } else {
        return res.json({ message: 'Indikator berhasil dihapus' });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteBulkDataIndicator;
