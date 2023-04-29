const model = require('../../../models');
const updateDepartmentSum = require('../utils/updateDepartmentSum');
const updateFacultySum = require('../utils/updateFacultySum');

const createMajorData = async (req, res) => {
  try {
    const { indicator_id, major_id, department_id, indicator_data } = req.body;
    const { q1, q2, q3, q4, target_value, year_value } = indicator_data;

    const total = q1 + q2 + q3 + q4;
    const is_target_fulfilled = total === 0 ? false : total >= target_value;

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

    // find year id based on year_value
    let year_id = 0;

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
    });

    if (!findYear) {
      const newYear = await model.Year.create({
        year_value,
      });

      year_id = newYear.year_id;
    } else {
      year_id = findYear.year_id;
    }

    // insert data to major
    const findIndicatorMajor = await model.IndicatorsMajor.findOne({
      where: {
        major_id,
        indicator_id,
      },
    });

    // -- find target_dep_id
    const findTargetMajor = await model.TargetMajor.findOne({
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

    if (findTargetMajor) {
      const findDep = await model.Department.findOne({
        where: {
          department_id,
        },
      });

      return res.status(404).json({
        message: `Error! data indikator untuk jurusan ${findDep.department_name} pada tahun ${year_value} sudah terdapat pada sistem`,
      });
    }

    const createTargetQuarter = await model.TargetQuarters.create({
      q1,
      q2,
      q3,
      q4,
      target_value,
      is_target_fulfilled,
      year_id,
    });

    await model.TargetMajor.create({
      indicator_major_id: findIndicatorMajor.indicator_major_id,
      target_quarter_id: createTargetQuarter.target_quarter_id,
    });

    await updateDepartmentSum({ indicator_id, department_id, year_id });
    await updateFacultySum({ indicator_id, year_id });

    res.json({ message: 'Data berhasil ditambahkan!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = createMajorData;
