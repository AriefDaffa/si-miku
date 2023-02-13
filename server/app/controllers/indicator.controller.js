const jwt = require('jsonwebtoken');
const model = require('../models');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const getAllIndicators = async (req, res) => {
  try {
    const indicator = await model.Indicator.findAll({
      attributes: ['indicator_id', 'indicator_code', 'indicator_name'],
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
        indicator_code: id,
      },
      attributes: ['indicator_code', 'indicator_name'],
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
                attributes: ['indicator_code', 'indicator_name'],
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
  const { year_val } = req.query;

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
            attributes: ['indicator_id', 'indicator_code', 'indicator_name'],
          },
          {
            model: model.IndicatorMajorYear,
            attributes: ['indicator_major_year_id'],
            include: [
              {
                model: model.Year,
                where: year_val ? { year_value: year_val } : {},
              },
              model.TargetQuarters,
            ],
          },
        ],
      },
    });

    const normalizeResult = {
      major_id: indicator.major_id,
      major_name: indicator.major_name,
      indicator_majors: indicator.indicator_majors.map((data) => {
        return {
          indicator_id: data.indicator.indicator_id,
          indicator_code: data.indicator.indicator_code,
          indicator_name: data.indicator.indicator_name,
          year_data: data.indicator_major_years.map((year) => {
            return {
              year_id: year.year.year_id,
              year_value: year.year.year_value,
              q1: year.target_quarter.q1,
              q2: year.target_quarter.q2,
              q3: year.target_quarter.q3,
              q4: year.target_quarter.q4,
              target: year.target_quarter.target_value,
              is_target_fulfilled: year.target_quarter.is_target_fulfilled,
            };
          }),
        };
      }),
    };

    res.json(normalizeResult);
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
  const { indicator_name, indicator_code, indicator_year } = req.body;
  const cookies = req.cookies.accessToken;

  try {
    jwt.verify(
      cookies,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedVal) => {
        if (err) {
          return res.sendStatus(403);
        }

        const majorId = await model.Major.findAll({
          attributes: ['major_id'],
        });

        // check duplicate indicator_id
        const indicatorId = await model.Indicator.findOne({
          where: {
            indicator_code,
          },
        });

        if (indicatorId) {
          return res.status(400).json({
            message: 'Error! Duplicate Indicators',
          });
        }

        // create new indicator if there is no indicator
        const indicator = await model.Indicator.create({
          indicator_code,
          indicator_name,
          created_by: decodedVal.user_id,
        });

        await model.IndicatorMajor.bulkCreate(
          majorId.map((data) => {
            return {
              indicator_id: indicator.indicator_id,
              major_id: data.major_id,
            };
          })
        );

        await Promise.all(
          indicator_year.map(async (data) => {
            await model.Year.bulkCreate(
              data.year_data.map((item) => {
                return {
                  year_value: item.year,
                };
              }),
              { ignoreDuplicates: true }
            );

            await Promise.all(
              data.year_data.map(async (item) => {
                const indicatorMajor = await model.IndicatorMajor.findOne({
                  where: {
                    indicator_id: indicator.indicator_id,
                    major_id: data.major_id,
                  },
                });

                const quarterTarget = await model.TargetQuarters.create({
                  target_value: item.target,
                  q1: item.q1,
                  q2: item.q2,
                  q3: item.q3,
                  q4: item.q4,
                  is_target_fulfilled:
                    item.q1 + item.q2 + item.q3 + item.q4 >= item.target,
                });

                const findYear = await model.Year.findOne({
                  where: {
                    year_value: item.year,
                  },
                });

                await model.IndicatorMajorYear.create({
                  indicator_major_id: indicatorMajor.indicator_major_id,
                  year_id: findYear.year_id,
                  target_quarter_id: quarterTarget.target_quarter_id,
                });
              })
            );
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
    const indicator = await model.Indicator.findAndCountAll();

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

    const normalize = year.map((data) => {
      return {
        year_value: data.year_value,
        fulfilled: data.indicator_major_years.filter((year) => {
          return year.target_quarter.is_target_fulfilled === true;
        }).length,
        failed: data.indicator_major_years.filter((year) => {
          return year.target_quarter.is_target_fulfilled === false;
        }).length,
      };
    });

    const result = {
      years: normalize,
      indicator_count: indicator.count,
      total_fulfilled: normalize.reduce((acc, cur) => acc + cur.fulfilled, 0),
      total_failed: normalize.reduce((acc, cur) => acc + cur.failed, 0),
    };

    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const getOverviewMajor = async (req, res) => {
  try {
    const majors = await model.Major.findAll({
      include: {
        model: model.IndicatorMajor,
        include: {
          model: model.IndicatorMajorYear,
          include: [model.TargetQuarters],
        },
      },
    });

    const normalize = majors.map((data) => {
      return {
        major_id: data.major_id,
        major_name: data.major_name,
        indicator_majors: data.indicator_majors.map((indicator) => {
          return {
            fulfilled: indicator.indicator_major_years.filter(
              (item) => item.target_quarter.is_target_fulfilled === true
            ).length,
            failed: indicator.indicator_major_years.filter(
              (item) => item.target_quarter.is_target_fulfilled === false
            ).length,
          };
        }),
      };
    });

    const result = normalize.map(({ indicator_majors, ...rest }) => {
      return {
        ...rest,
        indicator_majors,
        total_fulfilled: indicator_majors.reduce(
          (acc, cur) => acc + cur.fulfilled,
          0
        ),
        total_failed: indicator_majors.reduce(
          (acc, cur) => acc + cur.failed,
          0
        ),
      };
    });

    res.json(result);
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
    const { indicator_code } = req.body;

    const remove = await model.Indicator.destroy({
      where: {
        indicator_code,
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
  getOverviewMajor,
  getTargetQuarterByYear,
  deleteIndicatorById,
  createIndicator,
  createBulkIndicator,
};
