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
        indicator_id: id,
      },
      attributes: ['indicator_id', 'indicator_code', 'indicator_name'],
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

    const normalize = {
      indicator_id: user.indicator_id,
      indicator_code: user.indicator_code,
      indicator_name: user.indicator_name,
      indicator_majors: user.indicator_majors.map((item) => {
        return {
          major: item.major,
          indicator_data: item.indicator_major_years.map((data) => {
            return {
              indicator_major_year_id: data.indicator_major_year_id,
              year: data.year,
              target: data.target_quarter.target_value,
              q1: data.target_quarter.q1,
              q2: data.target_quarter.q2,
              q3: data.target_quarter.q3,
              q4: data.target_quarter.q4,
              is_target_fulfilled: data.target_quarter.is_target_fulfilled,
            };
          }),
        };
      }),
    };

    res.json(normalize);
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

//@TODO Remove is_target_fulfilled from db
const createIndicator = async (req, res) => {
  const { indicator } = req.body;
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

        const findIndicators = await model.Indicator.findAll({
          where: {
            indicator_code: indicator.map((item) => item.indicator_code),
          },
        });

        if (findIndicators.length !== 0) {
          return res.status(400).json({
            message: 'Error! Indikator sudah terdapat pada sistem',
          });
        }

        const indicators = await model.Indicator.bulkCreate(
          indicator.map((item) => {
            return {
              indicator_code: item.indicator_code,
              indicator_name: item.indicator_name,
              created_by: decodedVal.user_id,
            };
          })
        );

        await Promise.all(
          indicators.map(async (item) => {
            await model.IndicatorMajor.bulkCreate(
              majorId.map((data) => {
                return {
                  indicator_id: item.indicator_id,
                  major_id: data.major_id,
                };
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

const createIndicatorDataByMajor = async (req, res) => {
  try {
    const { year_value, target_value, q1, q2, q3, q4, major_id, indicator_id } =
      req.body;

    const total = q1 + q2 + q3 + q4;
    const is_target_fulfilled = total === 0 ? false : total >= target_value;
    let year_id = 0;

    const indicatorMajorId = await model.IndicatorMajor.findOne({
      where: {
        major_id,
        indicator_id,
      },
    });

    const findYear = await model.Year.findOne({
      where: {
        year_value,
      },
    });

    if (!findYear) {
      const createdYear = await model.Year.create({
        year_value,
      });

      year_id = createdYear.year_id;
    } else {
      year_id = findYear.year_id;
    }

    const isAlreadyCreated = await model.IndicatorMajorYear.findOne({
      where: {
        indicator_major_id: indicatorMajorId.indicator_major_id,
        year_id,
      },
    });

    if (isAlreadyCreated) {
      return res
        .status(400)
        .json({ message: 'Error! Data for that year already exist!' });
    }

    const targetQuarter = await model.TargetQuarters.create({
      target_value,
      q1,
      q2,
      q3,
      q4,
      is_target_fulfilled,
    });

    console.log(total >= target_value);

    await model.IndicatorMajorYear.create({
      year_id,
      indicator_major_id: indicatorMajorId.indicator_major_id,
      target_quarter_id: targetQuarter.target_quarter_id,
    });

    res.json({ message: 'Success! Data created' });
  } catch (error) {
    res.json(error);
  }
};

const getIndicatorCount = async (req, res) => {
  try {
    // const indicator = await model.Indicator.findAndCountAll();

    const result = await model.Year.findAll({
      include: {
        model: model.IndicatorMajorYear,
        attributes: ['indicator_major_year_id'],
        include: {
          model: model.TargetQuarters,
        },
      },
    });

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

    // const normalize = majors.map((data) => {
    //   return {
    //     major_id: data.major_id,
    //     major_name: data.major_name,
    //     indicator_majors: data.indicator_majors.map((indicator) => {
    //       return {
    //         fulfilled: indicator.indicator_major_years.filter(
    //           (item) => item.target_quarter.is_target_fulfilled === true
    //         ).length,
    //         failed: indicator.indicator_major_years.filter(
    //           (item) => item.target_quarter.is_target_fulfilled === false
    //         ).length,
    //       };
    //     }),
    //   };
    // });

    // const result = normalize.map(({ indicator_majors, ...rest }) => {
    //   return {
    //     ...rest,
    //     indicator_majors,
    //     total_fulfilled: indicator_majors.reduce(
    //       (acc, cur) => acc + cur.fulfilled,
    //       0
    //     ),
    //     total_failed: indicator_majors.reduce(
    //       (acc, cur) => acc + cur.failed,
    //       0
    //     ),
    //   };
    // });

    res.json(majors);
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

    if (remove === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteIndicatorData = async (req, res) => {
  try {
    const { indicator_major_year_id } = req.body;

    const findMajorYear = await model.IndicatorMajorYear.findAll({
      where: {
        indicator_major_year_id,
      },
    });

    if (findMajorYear.length === 0) {
      return res.json({ message: 'Error! Data indikator tidak ditemukan' });
    }

    const removeMajorYear = await model.IndicatorMajorYear.destroy({
      where: {
        indicator_major_year_id,
      },
    });

    const removeTargetQuarter = await model.TargetQuarters.destroy({
      where: {
        target_quarter_id: findMajorYear.map((item) => item.target_quarter_id),
      },
    });

    if (removeMajorYear === 0 && removeTargetQuarter === 0) {
      res.json({ message: 'Delete Error!' });
    } else {
      res.json({ message: 'Indikator berhasil dihapus' });
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
  deleteIndicatorData,
  createIndicator,
  createIndicatorDataByMajor,
};
