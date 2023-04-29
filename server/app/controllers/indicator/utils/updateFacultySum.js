const model = require('../../../models');

const updateFacultySum = async (data) => {
  const { indicator_id, year_id } = data;

  const findIndicatorFaculty = await model.IndicatorsFaculty.findOne({
    where: {
      indicator_id,
      faculty_id: 1,
    },
  });

  const findTargetFacs = await model.TargetFaculty.findOne({
    where: {
      indicator_faculty_id: findIndicatorFaculty.indicator_faculty_id,
    },
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
};

module.exports = updateFacultySum;
