const { Op } = require('sequelize');
const model = require('../../models');

const postDataFacultyIndicator = async (req, res) => {
  try {
    const { indicator_id, indicator_faculty_data } = req.body;

    // const { q1, q2, q3, q4, target_value, year_value } = indicator_faculty_data;
    // const total = q1 + q2 + q3 + q4;
    // const is_target_fulfilled = total === 0 ? false : total >= target_value;

    let data_array = [];
    let year_id = [];

    // --- check if the indicator is available -- //
    const checkIndicator = await model.Indicator.findOne({
      where: {
        indicator_id,
      },
    });

    if (!checkIndicator) {
      return res.status(404).json({ message: 'Indicator Not Found!' });
    }

    await Promise.all(
      indicator_faculty_data.map(async (data) => {
        const { q1, q2, q3, q4, target_value, year_value } = data;
        const total = q1 + q2 + q3 + q4;
        const is_target_fulfilled = total === 0 ? false : total >= target_value;

        data_array.push({ q1, q2, q3, q4, target_value, is_target_fulfilled });

        const findYear = await model.Year.findOne({
          where: {
            year_value,
          },
        });

        if (!findYear) {
          const createdYear = await model.Year.create({
            year_value,
          });

          year_id.push(createdYear.year_id);
        } else {
          year_id.push(findYear.year_id);
        }
      })
    );

    const findFacultyIndicator = await model.FacultyIndicator.findAll({
      where: {
        indicator_id,
        year_id,
      },
    });

    if (findFacultyIndicator.length > 0) {
      const duplicatedYear = await model.Year.findAll({
        where: {
          year_id: findFacultyIndicator.map((item) => item.year_id),
        },
      });

      return res.status(400).json({
        message: `Error! Data indikator untuk tahun ${duplicatedYear
          .map((item) => item.year_value)
          .join(', ')} sudah terdapat pada server`,
      });
    }

    const targetQuarter = await model.TargetQuarters.bulkCreate(data_array);

    await model.FacultyIndicator.bulkCreate(
      indicator_faculty_data.map((item, idx) => {
        return {
          indicator_id,
          year_id: year_id[idx],
          target_quarter_id: targetQuarter[idx].target_quarter_id,
        };
      })
    );

    res.json({ message: 'Data successfully created' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = postDataFacultyIndicator;
