const model = require('../../models');

const postDataMajorIndicator = async (req, res) => {
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
      return res.json({ message: 'Error! Indikator tidak ditemukan' });
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
      return res.json({
        message: `Error! data indikator untuk tahun ${year_value} sudah ada`,
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

    // ----------------------------- //
    //                               //
    // ----------------------------- //

    // step-by-step inserting data to department
    // 1 - search available data in the database
    // 2 - aggregate old data with the current data
    // ## - if there is no avalaible data in the database, create a new one

    const fid = await model.TargetMajor.findAll({
      include: [
        {
          model: model.IndicatorsMajor,
          where: {
            indicator_id,
          },
          include: {
            model: model.Major,
            where: {
              department_id,
            },
          },
        },
        { model: model.TargetQuarters, where: { year_id } },
      ],
    });

    const finalSum = fid.reduce(
      (acc, cur) => {
        const { target_quarter } = cur;
        const { q1, q2, q3, q4, target_value, year_id } = target_quarter;

        acc.q1 += q1;
        acc.q2 += q2;
        acc.q3 += q3;
        acc.q4 += q4;
        acc.target_value += target_value;

        acc.year_id = year_id;

        const total = acc.q1 + acc.q2 + acc.q3 + acc.q4;
        const isFulfilled = total === 0 ? false : total >= acc.target_value;

        acc.is_target_fulfilled = isFulfilled;

        return acc;
      },
      {
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        target_value: 0,
        year_id: 0,
        is_target_fulfilled: false,
      }
    );

    const indicatorDeps = await model.IndicatorsDepartment.findOne({
      where: {
        indicator_id,
        department_id,
      },
    });

    const findTargetDeps = await model.TargetDeps.findOne({
      where: {
        indicator_department_id: indicatorDeps.indicator_department_id,
      },
      include: {
        model: model.TargetQuarters,
        where: {
          year_id,
        },
      },
    });

    if (findTargetDeps) {
      const findTargetQuarter = await model.TargetQuarters.findOne({
        where: {
          target_quarter_id: findTargetDeps.target_quarter.target_quarter_id,
        },
      });

      findTargetQuarter.q1 = finalSum.q1;
      findTargetQuarter.q2 = finalSum.q2;
      findTargetQuarter.q3 = finalSum.q3;
      findTargetQuarter.q4 = finalSum.q4;
      findTargetQuarter.target_value = finalSum.target_value;
      findTargetQuarter.is_target_fulfilled = finalSum.is_target_fulfilled;

      await findTargetQuarter.save();
    } else {
      const depsTargetQuarter = await model.TargetQuarters.create(finalSum);

      await model.TargetDeps.create({
        indicator_department_id: indicatorDeps.indicator_department_id,
        target_quarter_id: depsTargetQuarter.target_quarter_id,
      });
    }

    // ----------------------------- //
    //                               //
    // ----------------------------- //

    const findIndicatorFaculty = await model.IndicatorsFaculty.findOne({
      where: {
        indicator_id,
        faculty_id: 1,
      },
    });

    const findTargetFacs = await model.TargetFaculty.findOne({
      indicator_faculty_id: findIndicatorFaculty.indicator_faculty_id,
      include: {
        model: model.TargetQuarters,
        where: {
          year_id,
        },
      },
    });

    const findAllTargetDeps = await model.TargetDeps.findAll({
      include: [
        {
          model: model.IndicatorsDepartment,
          where: {
            indicator_id,
          },
        },
        {
          model: model.TargetQuarters,
          where: {
            year_id,
          },
        },
      ],
    });

    const depsSum = findAllTargetDeps.reduce(
      (acc, cur) => {
        const { target_quarter } = cur;
        const { q1, q2, q3, q4, target_value, year_id } = target_quarter;

        acc.q1 += q1;
        acc.q2 += q2;
        acc.q3 += q3;
        acc.q4 += q4;
        acc.target_value += target_value;

        acc.year_id = year_id;

        const total = acc.q1 + acc.q2 + acc.q3 + acc.q4;
        const isFulfilled = total === 0 ? false : total >= acc.target_value;

        acc.is_target_fulfilled = isFulfilled;

        return acc;
      },
      {
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        target_value: 0,
        year_id: 0,
        is_target_fulfilled: false,
      }
    );

    if (findTargetFacs) {
      const findTargetQuarter = await model.TargetQuarters.findOne({
        where: {
          target_quarter_id: findTargetFacs.target_quarter.target_quarter_id,
        },
      });

      findTargetQuarter.q1 = depsSum.q1;
      findTargetQuarter.q2 = depsSum.q2;
      findTargetQuarter.q3 = depsSum.q3;
      findTargetQuarter.q4 = depsSum.q4;
      findTargetQuarter.target_value = depsSum.target_value;
      findTargetQuarter.is_target_fulfilled = depsSum.is_target_fulfilled;

      await findTargetQuarter.save();
    } else {
      const facsTargetQuarter = await model.TargetQuarters.create(depsSum);

      await model.TargetFaculty.create({
        indicator_faculty_id: findIndicatorFaculty.indicator_faculty_id,
        target_quarter_id: facsTargetQuarter.target_quarter_id,
      });
    }

    // res.json(depsSum);

    res.json({ message: 'Data berhasil ditambahkan!' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = postDataMajorIndicator;
