const model = require('../../../models');

const getAllMajor = async (req, res) => {
  try {
    const major = await model.Major.findAll();

    res.json(major);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getAllMajor;
