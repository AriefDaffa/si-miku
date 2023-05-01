const { Op } = require('sequelize');
const model = require('../../../models');

const getIndicatorOverview = async (req, res) => {
  const { page, size, keyword, year_value } = req.query;

  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  try {
    res.json();
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorOverview;
