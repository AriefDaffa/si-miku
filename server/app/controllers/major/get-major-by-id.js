const { Op } = require('sequelize');
const model = require('../../models');

const getMajorById = async (req, res) => {
  try {
    const { id } = req.params;

    const { page, size, keyword } = req.query;

    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    const major = await model.Major.findOne({
      where: {
        major_id: id,
      },
      // include: {
      //   model: model.IndicatorsMajor,
      //   include: [
      //     { model: model.Indicator },
      //     {
      //       model: model.TargetMajor,
      //       include: {
      //         model: model.TargetQuarters,
      //         include: model.Year,
      //       },
      //     },
      //   ],
      // },
    });

    const indicatorMajs = await model.IndicatorsMajor.findAndCountAll({
      limit,
      offset,
      // distinct: true,
      where: {
        major_id: id,
      },
      include: [
        {
          model: model.Indicator,
          where: {
            indicator_type: [3, 4],
            [Op.or]: [
              // { indicator_type: [3, 4] },
              { indicator_name: { [Op.like]: `%${keyword}%` } },
              { indicator_code: { [Op.like]: `%${keyword}%` } },
            ],
          },
        },
        {
          model: model.TargetMajor,
          include: {
            model: model.TargetQuarters,
            include: model.Year,
            // where: {
            //   year_id: 2,
            // },
          },
        },
      ],
    });

    const response = {
      major_id: major.major_id,
      major_name: major.major_name,
      major_image: major.major_image,
      total_data: indicatorMajs.count,
      total_page: Math.ceil(indicatorMajs.count / limit),
      current_page: page ? +page : 0,
      indicator_majors: indicatorMajs.rows,
    };

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getMajorById;
