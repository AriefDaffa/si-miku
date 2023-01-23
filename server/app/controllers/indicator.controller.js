const jwt = require('jsonwebtoken');
const model = require('../models');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const getAllIndicators = async (req, res) => {
  try {
    const indicator = await model.Indicator.findAll({
      attributes: ['indicator_id', 'indicator_name'],
      // include: {
      //   model: model.IndicatorMajor,
      //   attributes: ['major_id'],
      //   include: [
      //     model.Major,
      //     {
      //       model: model.IndicatorMajorYear,
      //       attributes: ['indicator_major_year_id'],
      //       include: [model.TargetQuarters, model.Year],
      //     },
      //   ],
      // },
    });

    res.json(indicator);
  } catch (error) {
    res.json(error);
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
        model: model.IndicatorMajor,
        attributes: ['major_id'],
        include: [
          model.Major,
          {
            model: model.IndicatorMajorYear,
            attributes: ['indicator_major_year_id'],
            include: [model.TargetQuarters, model.Year],
          },
        ],
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
        year_value: id,
      },
      include: {
        model: model.IndicatorMajorYear,
        attributes: ['indicator_major_year_id'],
        include: [
          {
            model: model.IndicatorMajor,
            attributes: ['indicator_major_id'],
            include: [
              {
                model: model.Indicator,
                attributes: ['indicator_id', 'indicator_name'],
              },
              { model: model.Major },
            ],
          },
          model.TargetQuarters,
        ],
      },
    });

    if (!year) {
      return res.status(404).json({ message: 'Error! Year not found' });
    }

    res.json(year);
  } catch (error) {
    res.json(error);
  }
};

const getIndicatorByMajorId = async (req, res) => {
  const { id } = req.params;

  try {
    const indicator = await model.Major.findOne({
      where: {
        major_id: id,
      },
      include: {
        model: model.IndicatorMajor,
        attributes: ['indicator_major_id'],
        include: [
          {
            model: model.Indicator,
            attributes: ['indicator_id', 'indicator_name'],
          },
          {
            model: model.IndicatorMajorYear,
            attributes: ['indicator_major_year_id'],
            include: [model.Year, model.TargetQuarters],
          },
        ],
      },
    });

    res.json(indicator);
  } catch (error) {
    res.json(error);
  }
};

const createBulkIndicator = async (req, res) => {
  try {
    console.log(req.body);
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
};

const createIndicator = async (req, res) => {
  const { indicator_name, indicator_id, indicator_year, major_id } = req.body;
  const cookies = req.cookies.accessToken;

  try {
    jwt.verify(
      cookies,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedVal) => {
        if (err) {
          return res.sendStatus(403);
        }

        const majorId = await model.IndicatorMajor.findOne({
          where: {
            indicator_id,
            major_id,
          },
        });

        if (majorId) {
          return res.status(400).json({
            message:
              'Error! id indicator untuk jurusan tersebut sudah terdapat pada sistem',
          });
        }

        // check duplicate indicator_id
        const indicatorId = await model.Indicator.findOne({
          where: {
            indicator_id,
          },
        });

        if (!indicatorId) {
          // create new indicator if there is no indicator
          await model.Indicator.create({
            indicator_id,
            indicator_name,
            created_by: decodedVal.user_id,
          });
        }

        const indicatorMajor = await model.IndicatorMajor.create({
          indicator_id,
          major_id,
        });

        // Assign data to year
        await Promise.all(
          indicator_year.map(async (data) => {
            // assign quarter and target data
            const quarterTarget = await model.TargetQuarters.create({
              target_value: data.target,
              q1: data.q1,
              q2: data.q2,
              q3: data.q3,
              q4: data.q4,
              is_target_fulfilled:
                data.q1 + data.q2 + data.q3 + data.q4 >= data.target,
            });

            // check if the inputted year is already existed in the table
            const findYear = await model.Year.findOne({
              where: {
                year_value: data.year,
              },
            });

            // if there is no year, create new value
            if (!findYear) {
              const year = await model.Year.create({
                year_value: data.year,
              });

              // Assign indicator to join table
              await model.IndicatorMajorYear.create({
                indicator_major_id: indicatorMajor.indicator_major_id,
                year_id: year.year_id,
                target_quarter_id: quarterTarget.target_quarter_id,
              });
            } else {
              // Assign indicator to join table
              await model.IndicatorMajorYear.create({
                indicator_major_id: indicatorMajor.indicator_major_id,
                year_id: findYear.year_id,
                target_quarter_id: quarterTarget.target_quarter_id,
              });
            }
          })
        );

        res.json({ message: 'Data berhasil dibuat' });
      }
    );
  } catch (error) {
    res.json(error);
  }
};

const getIndicatorCount = async (req, res) => {
  try {
    const year = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        attributes: ['indicator_major_year_id'],
        include: {
          model: model.TargetQuarters,
          attributes: ['is_target_fulfilled'],
        },
      },
    });

    const normalizedResult = year.reduce((acc, cur) => {
      cur.indicator_major_years.forEach((item) => {
        if (item.target_quarter.is_target_fulfilled !== null) {
          const targetFulfillment = acc.find(
            (target) =>
              target.is_target_fulfilled ===
              item.target_quarter.is_target_fulfilled
          );

          if (targetFulfillment) {
            const year = targetFulfillment.years.find(
              (year) => year.year_value === cur.year_value
            );

            if (year) {
              year.is_target_fulfilled.push(
                item.target_quarter.is_target_fulfilled
              );
              year.count = year.is_target_fulfilled.length;
            } else {
              targetFulfillment.years.push({
                year_value: cur.year_value,
                is_target_fulfilled: [item.target_quarter.is_target_fulfilled],
                count: 1,
              });
            }

            targetFulfillment.totalCount += 1;
          } else {
            acc.push({
              is_target_fulfilled: item.target_quarter.is_target_fulfilled,
              years: [
                {
                  year_value: cur.year_value,
                  is_target_fulfilled: [
                    item.target_quarter.is_target_fulfilled,
                  ],
                  count: 1,
                },
              ],
              totalCount: 1,
            });
          }
        }
      });
      return acc;
    }, []);

    res.json(normalizedResult);
  } catch (error) {
    res.json(error);
  }
};

const getTargetQuarterByYear = async (req, res) => {
  try {
    const targetSuccess = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        include: {
          model: model.TargetQuarters,
          where: {
            is_target_fulfilled: true,
          },
        },
      },
    });

    const targetFailed = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        include: {
          model: model.TargetQuarters,
          where: {
            is_target_fulfilled: false,
          },
        },
      },
    });

    res.json({
      failed_target: targetFailed.map((data) => {
        return {
          year_id: data.year_id,
          year_value: data.year_value,
          total: data.indicator_major_years.length,
        };
      }),
      success_target: targetSuccess.map((data) => {
        return {
          year_id: data.year_id,
          year_value: data.year_value,
          total: data.indicator_major_years.length,
        };
      }),
    });
  } catch (error) {
    res.json(error);
  }
};

const deleteIndicatorById = async (req, res) => {
  try {
    const { indicator_id } = req.body;

    const remove = await model.Indicator.destroy({
      where: {
        indicator_id,
      },
    });

    if (remove === 1) {
      res.json({ message: 'Indikator berhasil dihapus' });
    } else {
      res.json({ message: 'Delete Error!' });
    }
  } catch (error) {
    res.json(error);
  }
};

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

module.exports = {
  getIndicatorCount,
  getAllIndicators,
  getIndicatorById,
  getIndicatorsByYear,
  getIndicatorByMajorId,
  getYear,
  getTargetQuarterByYear,
  deleteIndicatorById,
  createIndicator,
  createBulkIndicator,
};
