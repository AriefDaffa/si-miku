const { Op } = require('sequelize');
const model = require('../../models');

const getIndicatoryear = async (req, res) => {
  try {
    const years = await model.IndicatorsDepartment.findAll({
      attributes: ['indicator_department_id'],
      where: {
        year_id: { [Op.ne]: null },
      },
      include: {
        model: model.Year,
      },
    });

    const normalize = years.filter(
      (e, idx) =>
        idx === years.findIndex((el) => el.year.year_id === e.year.year_id)
    );

    res.json(normalize);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatoryear;
