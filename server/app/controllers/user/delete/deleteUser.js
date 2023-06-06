const model = require('../../../models');

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await model.User.destroy({
      where: {
        user_id: id,
      },
    });

    if (user === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'User berhasil dihapus' });
    }
  } catch (error) {
    return res.json(error);
  }
};

module.exports = deleteUser;
