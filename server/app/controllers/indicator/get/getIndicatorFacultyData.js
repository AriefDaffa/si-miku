const { Op } = require('sequelize');
const model = require('../../../models');

const getIndicatorFacultyData = async (req, res) => {
  const { page, size, keyword, year_value } = req.query;

  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  try {
    let year_id = 0;

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
    });

    if (findYear) {
      year_id = findYear.year_id;
    }

    const indicator = await model.Indicator.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          { indicator_name: { [Op.like]: `%${keyword}%` } },
          { indicator_code: { [Op.like]: `%${keyword}%` } },
        ],
      },
      include: {
        model: model.IndicatorsFaculty,
        include: {
          model: model.TargetFaculty,
          include: {
            model: model.TargetQuarters,
            where: {
              year_id,
            },
          },
        },
      },
    });

    const defaultVal = {
      target_quarter_id: 0,
      target_value: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      is_target_fulfilled: false,
      year_id: 0,
    };

    const normalizeResponse = {
      total_data: indicator.count,
      total_page: Math.ceil(indicator.count / limit),
      current_page: page ? +page : 0,
      indicator_list: indicator.rows.reduce((acc, cur) => {
        const {
          indicator_id,
          indicator_code,
          indicator_name,
          indicator_type,
          supervised_by,
          indicator_faculties,
        } = cur;

        const data = indicator_faculties[0];
        const targetQuarter = data.target_faculties[0];

        acc.push({
          indicator_id,
          indicator_code,
          indicator_name,
          indicator_type,
          supervised_by,
          indicator_faculties: targetQuarter?.target_quarter || defaultVal,
        });

        return acc;
      }, []),
    };

    res.json(normalizeResponse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorFacultyData;
