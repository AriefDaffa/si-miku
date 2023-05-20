const model = require('../../../models');

const updateDepartmentSum = async (data) => {
  const { indicator_id, department_id, year_id } = data;

  //
  //
  //
  // Update department sum

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

  //
  //
  //
  //
  // update faculty sum

  //   const findIndicatorFaculty = await model.IndicatorsFaculty.findOne({
  //     where: {
  //       indicator_id,
  //       faculty_id: 1,
  //     },
  //   });

  //   const findTargetFacs = await model.TargetFaculty.findOne({
  //     where: {
  //       indicator_faculty_id: findIndicatorFaculty.indicator_faculty_id,
  //     },
  //     include: {
  //       model: model.TargetQuarters,
  //       where: {
  //         year_id,
  //       },
  //     },
  //   });

  //   console.log('find123', findTargetFacs);
};

module.exports = updateDepartmentSum;
