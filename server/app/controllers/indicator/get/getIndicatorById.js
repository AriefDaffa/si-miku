const { Op } = require('sequelize');
const model = require('../../../models');

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
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorById;
