const model = require('../../../models');
const updateDepartmentSum = require('../utils/updateDepartmentSum');
const updateFacultySum = require('../utils/updateFacultySum');

const deleteDepartmentData = async (req, res) => {
  try {
    const { indicator_id, department_id, year_id, target_quarter_id } =
      req.body;

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

    const findIndicatorDeps = await model.IndicatorsDepartment.findOne({
      where: {
        department_id,
        indicator_id,
      },
    });

    // -- find target_dep_id
    const findTargetDeps = await model.TargetDeps.destroy({
      where: {
        indicator_department_id: findIndicatorDeps.indicator_department_id,
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

    if (findTargetDeps === 0 || deleteTargetQuarter === 0) {
      const findDep = await model.Department.findOne({
        where: {
          department_id,
        },
      });

      return res.status(404).json({
        message: `Error! data indikator untuk jurusan ${findDep.department_name} pada tahun ${year_value} Tidak ditemukan`,
      });
    }

    await updateFacultySum({ indicator_id, year_id });

    res.json({ message: 'Data berhasil dihapus!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteDepartmentData;
