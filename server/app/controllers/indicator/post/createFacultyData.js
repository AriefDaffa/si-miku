const model = require('../../../models');

const createFacultyData = async (req, res) => {
  try {
    const { indicator_id, indicator_data } = req.body;
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
    const findIndicatorFacs = await model.IndicatorsFaculty.findOne({
      where: {
        indicator_id,
        faculty_id: 1,
      },
    });

    // -- find target_dep_id
    const findTargetFacs = await model.TargetFaculty.findOne({
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

    if (findTargetFacs) {
      return res.status(404).json({
        message: `Error! data indikator pada tahun ${year_value} sudah terdapat pada sistem`,
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

    await model.TargetFaculty.create({
      indicator_faculty_id: findIndicatorFacs.indicator_faculty_id,
      target_quarter_id: createTargetQuarter.target_quarter_id,
    });

    res.json({ message: 'Data berhasil ditambahkan!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = createFacultyData;
