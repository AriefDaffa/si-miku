const model = require('../../models');

const deleteDataIndicator = async (req, res) => {
  try {
    const { target_quarter_id } = req.body;

    const targetQuarter = await model.TargetQuarters.destroy({
      where: {
        target_quarter_id,
      },
    });

    if (targetQuarter === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = deleteDataIndicator;
