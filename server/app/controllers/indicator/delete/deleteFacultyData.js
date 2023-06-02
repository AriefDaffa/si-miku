const model = require('../../../models');

const deleteFacultyData = async (req, res) => {
  try {
    const { indicator_id, year_id, target_quarter_id } = req.body;

    const findIndicator = await model.Indicator.findOne({
      where: {
        indicator_id,
      },
    });

    if (!findIndicator) {
      return res
        .status(404)
        .json({ message: 'Error! Indikator tidak ditemukan' });
    }

    const findIndicatorFacs = await model.IndicatorsFaculty.findOne({
      where: {
        faculty_id: 1,
        indicator_id,
      },
    });

    // -- find target_faculties_id
    const findTargetFacs = await model.TargetFaculty.destroy({
      where: {
        indicator_faculty_id: findIndicatorFacs.indicator_faculty_id,
      },
      include: {
        model: model.TargetQuarters,
        where: {
          year_id,
        },
      },
    });

    const deleteTargetQuarter = await model.TargetQuarters.destroy({
      where: {
        target_quarter_id,
      },
    });

    if (findTargetFacs === 0 || deleteTargetQuarter === 0) {
      return res.status(404).json({
        message: `Error! data indikator Tidak ditemukan`,
      });
    }

    res.json({ message: 'Data berhasil dihapus!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteFacultyData;
