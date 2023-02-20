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

const createMajor = async (req, res) => {
  try {
    const { major_id, major_name } = req.body;
    const { path } = req.file;

    const findMajor = await model.Major.findOne({
      where: {
        major_id,
        major_name,
      },
    });

    if (findMajor) {
      return res.json({ message: 'Error! Duplicate value' });
    }

    await model.Major.create({ major_id, major_name, major_image: path });

    res.json({ message: 'Jurusan berhasil ditambahkan' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getMajor, createMajor };
