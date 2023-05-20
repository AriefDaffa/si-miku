const { Op } = require('sequelize');
const model = require('../../models');

const getIndicatorById = async (req, res) => {
  const { id } = req.params;

  try {
    const indicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
      include: [
        {
          model: model.IndicatorsDepartment,
          include: [
            { model: model.Department },
            {
              model: model.TargetDeps,
              include: {
                model: model.TargetQuarters,
                include: {
                  model: model.Year,
                },
              },
            },
          ],
        },
        {
          model: model.IndicatorsMajor,
          attributes: ['indicator_major_id'],
          include: [
            { model: model.Major },
            {
              model: model.TargetMajor,
              include: {
                model: model.TargetQuarters,
                include: { model: model.Year },
              },
            },
          ],
        },
        {
          model: model.IndicatorsFaculty,
          attributes: ['indicator_faculty_id'],
          include: [
            { model: model.Faculty },
            {
              model: model.TargetFaculty,
              include: {
                model: model.TargetQuarters,
                include: { model: model.Year },
              },
            },
          ],
        },
      ],
    });

    if (!indicator) {
      return res
        .status(404)
        .json({ message: 'Error! Indikator tidak ditemukan' });
    }

    res.json(indicator);

    // const indicator_departments = [];
    // const indicator_faculties = [];
    // const indicator_majors = [];

    // if (indicator.indicator_type === 2) {
    //   const indicatorDeps = await model.IndicatorsDepartment.findAll({
    //     where: {
    //       indicator_id: indicator.indicator_id,
    //     },
    //     include: [
    //       { model: model.Department },
    //       {
    //         model: model.TargetDeps,
    //         include: { model: model.TargetQuarters, include: model.Year },
    //       },
    //     ],
    //   });

    //   indicator_departments.push(...indicatorDeps);
    // } else if (
    //   indicator.indicator_type === 3 ||
    //   indicator.indicator_type === 4
    // ) {
    //   const indicatorMajor = await model.IndicatorsMajor.findAll({
    //     where: {
    //       indicator_id: indicator.indicator_id,
    //     },
    //     attributes: ['indicator_major_id'],
    //     include: [
    //       { model: model.Major },
    //       {
    //         model: model.TargetMajor,
    //         include: { model: model.TargetQuarters, include: model.Year },
    //       },
    //     ],
    //   });

    //   indicator_majors.push(...indicatorMajor);
    // } else if (indicator.indicator_type === 1) {
    //   const indicatorFaculty = await model.IndicatorsFaculty.findAll({
    //     where: {
    //       indicator_id: indicator.indicator_id,
    //     },
    //     attributes: ['indicator_faculty_id'],
    //     include: [
    //       { model: model.Faculty },
    //       {
    //         model: model.TargetFaculty,
    //         include: { model: model.TargetQuarters, include: model.Year },
    //       },
    //     ],
    //   });

    //   indicator_faculties.push(...indicatorFaculty);
    // }

    // const response = {
    //   indicator_id: indicator.indicator_id,
    //   indicator_code: indicator.indicator_code,
    //   indicator_name: indicator.indicator_name,
    //   indicator_type: indicator.indicator_type,
    //   indicator_data_type: indicator.indicator_data_type,
    //   indicator_departments,
    //   indicator_faculties,
    //   indicator_majors,
    // };

    // res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorById;
