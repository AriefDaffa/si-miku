const model = require('../../models');

const getYear = async (req, res) => {
  try {
    const year = await model.Year.findAll({
      attributes: ['year_value'],
    });

    return res.json(year);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = getYear;
