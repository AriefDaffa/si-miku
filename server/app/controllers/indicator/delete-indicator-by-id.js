const model = require('../../models');

const deleteIndicatorById = async (req, res) => {
  try {
    const { indicator_id } = req.body;

    const remove = await model.Indicator.destroy({
      where: {
        indicator_id,
      },
    });

    if (remove === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteIndicatorById;
