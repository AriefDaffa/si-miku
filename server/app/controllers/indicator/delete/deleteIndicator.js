const model = require('../../../models');

const deleteIndicator = async (req, res) => {
  try {
    const { id } = req.params;

    const remove = await model.Indicator.destroy({
      where: {
        indicator_id: id,
      },
    });

    if (remove === 0) {
      res.status(400).json({ message: 'Error! Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteIndicator;
