const { Op } = require('sequelize');
const model = require('../../../models');

const getIndicatorOverview = async (req, res) => {
  try {
    const { year_interval } = req.query;

    const yearValArray = year_interval.split(',');

    const findYearFunction = async () => {
      const result = [];

      for (let i = 0; i < yearValArray.length; i++) {
        const findYear = await model.Year.findOne({
          where: {
            year_value: yearValArray[i],
          },
          include: {
            model: model.TargetQuarters,
            include: {
              model: model.TargetFaculty,
              include: {
                model: model.IndicatorsFaculty,
              },
            },
          },
        });

        if (!findYear) {
          result.push({
            year_id: 0,
            year_value: Number(yearValArray[i]),
            count: {
              fulfilled: 0,
              failed: 0,
            },
          });
        } else {
          const loo = {
            year_id: findYear.year_id,
            year_value: findYear.year_value,
            ...findYear.target_quarters.reduce(
              (acc, cur) => {
                if (cur.target_faculties.length > 0) {
                  if (cur.is_target_fulfilled === true) {
                    acc.count.fulfilled += 1;
                  } else if (cur.is_target_fulfilled === false) {
                    acc.count.failed += 1;
                  }
                }

                return acc;
              },
              { count: { fulfilled: 0, failed: 0 } }
            ),
          };

          result.push(loo);
        }
      }

      return result;
    };

    const findYear = await findYearFunction();

    const indicator = await model.Indicator.findAndCountAll({
      distinct: true,
      include: {
        model: model.IndicatorsFaculty,
        include: {
          model: model.TargetFaculty,
          include: {
            model: model.TargetQuarters,
            include: model.Year,
          },
        },
      },
    });

    const normalizeResponse = {
      indicator_total: indicator.count,
      ...indicator.rows.reduce(
        (acc, cur) => {
          const { indicator_type, indicator_faculties } = cur;

          let tempYear = [];

          if (indicator_type === 4) {
            acc.indicator_department += 1;
            acc.indicator_major += 1;
          } else if (indicator_type === 2) {
            acc.indicator_department += 1;
          } else if (indicator_type === 3) {
            acc.indicator_major += 1;
          }

          return acc;
        },
        { indicator_department: 0, indicator_major: 0 }
      ),
      year_progress: findYear,
    };

    res.json(normalizeResponse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getIndicatorOverview;
