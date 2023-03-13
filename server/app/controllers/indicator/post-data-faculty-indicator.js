const model = require('../../models');

const postDataFacultyIndicator = async (req, res) => {
  try {
    const { indicator_id, indicator_faculty_data } = req.body;

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
      indicator_faculty_data.map(async (item) => {
        const { q1, q2, q3, q4, target_value, year_value } = item;

        const total = q1 + q2 + q3 + q4;
        const is_target_fulfilled = total === 0 ? false : total >= target_value;
        let year_id = 0;

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

        const findFacultyIndicator = await model.FacultyIndicator.findOne({
          where: {
            indicator_id: checkIndicator.indicator_id,
            year_id,
          },
        });

        if (findFacultyIndicator) {
          res.status(400).json({
            message: 'Data tahun untuk indikator sudah terdapat pada server',
          });
          throw {};
        }

        const targetQuarter = await model.TargetQuarters.create({
          target_value,
          q1,
          q2,
          q3,
          q4,
          is_target_fulfilled,
        });

        await model.FacultyIndicator.create({
          indicator_id,
          year_id,
          target_quarter_id: targetQuarter.target_quarter_id,
        });
      })
    );

    return res.json({ message: 'Data successfully created' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = postDataFacultyIndicator;
