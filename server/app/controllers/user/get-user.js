const model = require('../../models');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await model.User.findAll({
      where: {
        role_id: id,
      },
      attributes: ['user_id', 'user_name', 'user_email', 'user_image'],
    });

    res.json(user);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = getUser;
