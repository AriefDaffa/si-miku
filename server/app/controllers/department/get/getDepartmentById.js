const { Op } = require('sequelize');
const model = require('../../../models');

const getDepartmentByID = async (req, res) => {
  try {
    const { id } = req.params;

    const { page, size, keyword, year_value } = req.query;

    let year_id = 0;

    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
    });

    if (findYear) {
      year_id = findYear.year_id;
    }

    const indicatorDeps = await model.IndicatorsDepartment.findAndCountAll({
      limit,
      offset,
      where: {
        department_id: id,
      },
      distinct: true,
      include: [
        {
          model: model.Indicator,
          where: {
            [Op.and]: {
              indicator_type: [2, 4],
              [Op.or]: [
                { indicator_name: { [Op.like]: `%${keyword}%` } },
                { indicator_code: { [Op.like]: `%${keyword}%` } },
              ],
            },
          },
        },
        {
          model: model.TargetDeps,
          include: {
            model: model.TargetQuarters,
          },
        },
      ],
    });

    const response = {
      total_data: indicatorDeps.count,
      total_page: Math.ceil(indicatorDeps.count / limit),
      current_page: page ? +page : 0,
      //   indicator_list: indicatorDeps.rows,
      indicator_list: indicatorDeps.rows.reduce((acc, cur) => {
        const { indicator, target_deps } = cur;

        const newTargetQuarter = target_deps.filter(
          (item) => item.target_quarter.year_id === year_id
        );

        acc.push({
          indicator_id: indicator.indicator_id,
          indicator_code: indicator.indicator_code,
          indicator_name: indicator.indicator_name,
          indicator_type: indicator.indicator_type,
          indicator_data_type: indicator.indicator_data_type,
          supervised_by: indicator.supervised_by,
          target_quarter:
            newTargetQuarter.length > 0
              ? newTargetQuarter[0].target_quarter
              : {
                  target_quarter_id: 0,
                  target_value: 0,
                  q1: 0,
                  q2: 0,
                  q3: 0,
                  q4: 0,
                  is_target_fulfilled: false,
                  year_id: 0,
                },
        });
        return acc;
      }, []),
    };

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getDepartmentByID;
