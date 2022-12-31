const { Sequelize, QueryTypes } = require('sequelize');
const model = require('../models');

const getAllIndicators = async (req, res) => {
  try {
    const indicator = await model.Indicator.findAll({
      include: {
        model: model.Year,
        attributes: ['year_id'],
        through: {
          attributes: ['target', 'q1', 'q2', 'q3', 'q4'],
        },
      },
    });

    res.json(indicator);
  } catch (error) {
    console.log(error);
  }
};

const getIndicatorById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await model.Indicator.findOne({
      where: {
        indicator_id: id,
      },
      attributes: ['indicator_id', 'indicator_name'],
      include: {
        model: model.Year,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Error! Indicator not found' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getIndicatorsByYear = async (req, res) => {
  const { id } = req.params;

  try {
    const year = await model.Year.findOne({
      where: {
        year_id: id,
      },
      include: {
        model: model.Indicator,
        attributes: ['indicator_id', 'indicator_name'],
      },
    });

    if (!year) {
      return res.status(404).json({ message: 'Error! Year not found' });
    }

    res.json(year);
  } catch (error) {
    console.log(error);
  }
};

const createIndicator = async (req, res) => {
  const { indicator_name, indicator_year } = req.body;

  try {
    const indicator = await model.Indicator.create({
      indicator_name,
    });

    await Promise.all(
      indicator_year.map(async (data) => {
        // check if the inputted year is already existed in the table
        const findYear = await model.Year.findOne({
          where: {
            year_id: data.year_id,
          },
        });

        // if there is no year, create new value
        if (!findYear) {
          await model.Year.create({
            year_id: data.year_id,
          });
        }

        await model.TargetAndQuarter.create({
          indicator_id: indicator.indicator_id,
          year_id: data.year_id,
          target: data.target,
          q1: data.q1,
          q2: data.q2,
          q3: data.q3,
          q4: data.q4,
        });

        return findYear;
      })
    );

    const createdData = await model.Indicator.findOne({
      where: {
        indicator_id: indicator.indicator_id,
      },
      include: {
        model: model.Year,
      },
    });

    res.json(createdData);
  } catch (error) {
    res.json(error);
  }
};

const getTotalIndicator = async (req, res) => {
  try {
    const total = await model.Indicator.findAndCountAll();
    const [failed] = await model.Indicator.sequelize.query(
      'SELECT COUNT(target) as total FROM `target_quarters` WHERE q1 + q2 + q3 + q4 <= target',
      { type: QueryTypes.SELECT }
    );
    const [success] = await model.Indicator.sequelize.query(
      'SELECT COUNT(target) as total FROM `target_quarters` WHERE q1 + q2 + q3 + q4 >= target',
      { type: QueryTypes.SELECT }
    );

    return res.json({
      total: total.count,
      failed: failed.total,
      success: success.total,
    });
  } catch (error) {
    return res.json(error);
  }
};

const getYear = async (req, res) => {
  try {
    const year = await model.Year.findAll({
      attributes: ['year_id'],
    });

    return res.json(year);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  getTotalIndicator,
  getAllIndicators,
  getIndicatorById,
  getIndicatorsByYear,
  createIndicator,
  getYear,
};
