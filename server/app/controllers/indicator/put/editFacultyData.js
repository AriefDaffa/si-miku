const model = require('../../../models');

const editFacultyData = async (req, res) => {
  try {
    const { id } = req.params;
    const { target_quarter_id, q1, q2, q3, q4, target_value } = req.body;

    const total = q1 + q2 + q3 + q4;
    const is_target_fulfilled = total === 0 ? false : total >= target_value;

    const findIndicator = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
    });

    if (!findIndicator) {
      return res
        .status(404)
        .json({ message: 'Error! Indikator tidak ditemukan' });
    }

    const findTargetQuarterID = await model.TargetQuarters.findOne({
      where: {
        target_quarter_id,
      },
    });

    if (!findTargetQuarterID) {
      return res.status(404).json({ message: 'Error! Data tidak ditemukan' });
    }

    findTargetQuarterID.q1 = q1;
    findTargetQuarterID.q2 = q2;
    findTargetQuarterID.q3 = q3;
    findTargetQuarterID.q4 = q4;
    findTargetQuarterID.target_value = target_value;
    findTargetQuarterID.is_target_fulfilled = is_target_fulfilled;

    await findTargetQuarterID.save();

    res.json({ message: 'Data berhasil diubah' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = editFacultyData;
