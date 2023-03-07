const model = require('../../models');

const postDataToIndicator = async (req, res) => {
  try {
    const {
      indicator_id,
      is_faculty_indicator,
      indicator_faculty_data,
      indicator_major_data,
    } = req.body;

    // --- check if the indicator is available -- //
    const checkIndicator = await model.Indicator.findOne({
      where: {
        indicator_id,
      },
    });

    if (!checkIndicator) {
      return res.status(404).json({ message: 'Indicator Not Found!' });
    }

    // --- insert faculty indicator --- //
    if (is_faculty_indicator) {
      await Promise.all(
        indicator_faculty_data.map(async (item) => {
          const { q1, q2, q3, q4, target_value, year_value } = item;

          const total = q1 + q2 + q3 + q4;
          const is_target_fulfilled =
            total === 0 ? false : total >= target_value;
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
    } else {
      // --- insert major indicator --- //
      await Promise.all(
        indicator_major_data.map(async (item) => {
          const { major_id, indicator_data } = item;

          const majorIndicator = await model.MajorIndicator.findOne({
            where: {
              indicator_id,
              major_id,
            },
          });

          await Promise.all(
            indicator_data.map(async (data) => {
              const { q1, q2, q3, q4, target_value, year_value } = data;

              const total = q1 + q2 + q3 + q4;
              const is_target_fulfilled =
                total === 0 ? false : total >= target_value;
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

              const targetQuarter = await model.TargetQuarters.create({
                target_value,
                q1,
                q2,
                q3,
                q4,
                is_target_fulfilled,
              });

              await model.MajorIndicatorYear.create({
                year_id,
                major_indicator_id: majorIndicator.major_indicator_id,
                target_quarter_id: targetQuarter.target_quarter_id,
              });
            })
          );
        })
      );

      return res.json({ message: 'Data successfully created' });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = postDataToIndicator;
