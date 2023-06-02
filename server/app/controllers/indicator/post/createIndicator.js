const jwt = require('jsonwebtoken');
const model = require('../../../models');

const createIndicator = async (req, res) => {
  const { indicator_list } = req.body;
  const cookies = req.cookies.accessToken;

  try {
    jwt.verify(
      cookies,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedVal) => {
        if (err) {
          return res.sendStatus(403);
        }

        const findIndicator = await model.Indicator.findAll({
          where: {
            indicator_code: indicator_list.map((item) => item.indicator_code),
          },
        });

        if (findIndicator.length > 0) {
          return res.status(409).json({
            message: `Error! Indikator ${findIndicator
              .map((item) => item.indicator_code)
              .join(', ')} sudah terdapat pada sistem`,
          });
        }

        const indicator = await model.Indicator.bulkCreate(
          indicator_list.map((item) => {
            return {
              indicator_code: item.indicator_code,
              indicator_name: item.indicator_name,
              supervised_by: item.supervised_by,
              indicator_type: 1,
              indicator_data_type: item.indicator_data_type,
              created_by: decodedVal.user_id,
            };
          })
        );

        const department = await model.Department.findAll();
        const faculty = await model.Faculty.findAll();
        const major = await model.Major.findAll();

        // insert indicator to join
        await Promise.all(
          indicator.map(async (data) => {
            await model.IndicatorsDepartment.bulkCreate(
              department.map((item) => {
                return {
                  indicator_id: data.indicator_id,
                  department_id: item.department_id,
                };
              })
            );

            await model.IndicatorsFaculty.bulkCreate(
              faculty.map((item) => {
                return {
                  indicator_id: data.indicator_id,
                  faculty_id: item.faculty_id,
                };
              })
            );

            await model.IndicatorsMajor.bulkCreate(
              major.map((item) => {
                return {
                  indicator_id: data.indicator_id,
                  major_id: item.major_id,
                };
              })
            );
          })
        );

        res.json({ message: 'Indikator berhasil dibuat' });
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = createIndicator;
