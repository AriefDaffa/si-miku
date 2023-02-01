const jwt = require('jsonwebtoken');
const model = require('../models');

const getMajor = async (req, res) => {
  try {
    const major = await model.Major.findAll();

    res.json(major);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getMajor };
