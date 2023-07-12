const { Op } = require('sequelize');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const model = require('../../../models');
const s3 = require('../../../config/aws.config');

const getUser = async (req, res) => {
  try {
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

    const user_list = [];

    for (const item of user.rows) {
      if (item.user_image === null) {
        user_list.push({
          user_id: item.user_id,
          profession: item.profession,
          user_email: item.user_email,
          user_image: item.user_image,
          role: item.role,
        });
      } else {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: item.user_image,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        user_list.push({
          user_id: item.user_id,
          profession: item.profession,
          user_email: item.user_email,
          user_image: url,
          role: item.role,
        });
      }
    }

    const normalizeResponse = {
      total_data: user.count,
      total_page: Math.ceil(user.count / limit),
      current_page: page ? +page : 0,
      user_list,
    };

    res.json(normalizeResponse);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = getUser;
