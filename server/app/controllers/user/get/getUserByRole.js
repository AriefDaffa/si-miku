const { Op } = require('sequelize');
const model = require('../../../models');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, size, keyword, year_value } = req.query;

    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    const user = await model.User.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.and]: {
          role_id: { [Op.not]: 9 },
          [Op.or]: {
            profession: { [Op.like]: `%${keyword}%` },
            user_email: { [Op.like]: `%${keyword}%` },
          },
        },
      },
      include: {
        model: model.Role,
      },
      attributes: ['user_id', 'profession', 'user_email', 'user_image'],
    });

    const normalizeResponse = {
      total_data: user.count,
      total_page: Math.ceil(user.count / limit),
      current_page: page ? +page : 0,
      user_list: user.rows,
    };

    res.json(normalizeResponse);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = getUser;
