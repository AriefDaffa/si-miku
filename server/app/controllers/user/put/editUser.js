const jwt = require('jsonwebtoken');
const model = require('../../../models');

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { profession, user_email, role_id, password } = req.body;

    const file =
      req.file !== undefined ? 'images/profile/' + req.file.filename : '';

    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_id: id,
      },
      //   attributes: ['user_id', 'user_email', 'user_name', 'role_id'],
    });

    if (!user) {
      return res.status(404).send({ message: 'Error! User not found' });
    }

    user.profession = profession;
    user.user_image = file;
    user.user_email = user_email;
    user.password = password;
    user.role_id = role_id;

    await user.save();

    res.json({ message: 'User berhasil diubah' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = editUser;
