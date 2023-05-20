const model = require('../../../models');
const updateDepartmentSum = require('../utils/updateDepartmentSum');
const updateFacultySum = require('../utils/updateFacultySum');

const createMajorBulkData = async (req, res) => {
  try {
    const { indicator_id, year_value, is_overwrite, indicator_list } = req.body;

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

    //@TODO add is_overwrite func

    if (is_overwrite) {
      for await (const item of indicator_list) {
        const findIndicatorMajor = await model.IndicatorsMajor.findOne({
          where: {
            indicator_id,
            major_id: item.major_id,
          },
        });

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

        const total =
          item.target_quarter.q1 +
          item.target_quarter.q2 +
          item.target_quarter.q3 +
          item.target_quarter.q4;
        const is_target_fulfilled =
          total === 0 ? false : total >= item.target_quarter.target_value;

        if (!findTargetMajor) {
          const targetQuarter = await model.TargetQuarters.create({
            q1: item.target_quarter.q1,
            q2: item.target_quarter.q2,
            q3: item.target_quarter.q3,
            q4: item.target_quarter.q4,
            target_value: item.target_quarter.target_value,
            is_target_fulfilled: is_target_fulfilled,
            year_id,
          });

          const createTargetMajor = await model.TargetMajor.create({
            indicator_major_id: findIndicatorMajor.indicator_major_id,
            target_quarter_id: targetQuarter.target_quarter_id,
          });
        } else {
          const targetQuarter = await model.TargetQuarters.findOne({
            where: {
              target_quarter_id: findTargetMajor.target_quarter_id,
            },
          });

          targetQuarter.q1 = item.target_quarter.q1;
          targetQuarter.q2 = item.target_quarter.q2;
          targetQuarter.q3 = item.target_quarter.q3;
          targetQuarter.q4 = item.target_quarter.q4;
          targetQuarter.target_value = item.target_quarter.target_value;
          targetQuarter.is_target_fulfilled = is_target_fulfilled;

          await targetQuarter.save();
        }
      }
    }

    await updateDepartmentSum({ indicator_id, department_id: 1, year_id });
    await updateDepartmentSum({ indicator_id, department_id: 2, year_id });
    await updateFacultySum({ indicator_id, year_id });

    res.json({ message: 'Data berhasil ditambahkan!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = createMajorBulkData;
