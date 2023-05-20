const model = require('../../../models');
const updateDepartmentSum = require('../utils/updateDepartmentSum');
const updateFacultySum = require('../utils/updateFacultySum');

const deleteMajorData = async (req, res) => {
  try {
    const {
      indicator_id,
      major_id,
      department_id,
      year_id,
      target_quarter_id,
    } = req.body;

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

    const findIndicatorMajor = await model.IndicatorsMajor.findOne({
      where: {
        major_id,
        indicator_id,
      },
    });

    // -- find target_dep_id
    const findTargetMajor = await model.TargetMajor.destroy({
      where: {
        indicator_major_id: findIndicatorMajor.indicator_major_id,
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

    if (findTargetMajor === 0 || deleteTargetQuarter === 0) {
      const findDep = await model.Department.findOne({
        where: {
          department_id,
        },
      });

      return res.status(404).json({
        message: `Error! data indikator untuk jurusan ${findDep.department_name} pada tahun ${year_value} Tidak ditemukan`,
      });
    }

    await updateDepartmentSum({ indicator_id, department_id, year_id });
    await updateFacultySum({ indicator_id, year_id });

    res.json({ message: 'Data berhasil dihapus!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteMajorData;
