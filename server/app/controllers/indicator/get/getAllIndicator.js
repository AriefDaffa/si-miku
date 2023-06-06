const { Op } = require('sequelize');
const model = require('../../../models');

const getAllIndicators = async (req, res) => {
  const { page, size, keyword } = req.query;

  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  try {
    const indicator = await model.Indicator.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          { indicator_name: { [Op.like]: `%${keyword}%` } },
          { indicator_code: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    const normalizeResponse = {
      total_data: indicator.count,
      total_page: Math.ceil(indicator.count / limit),
      current_page: page ? +page : 0,
      indicator_list: indicator.rows,
    };

    res.json(normalizeResponse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllIndicators;
