const jwt = require('jsonwebtoken');
const model = require('../../models');

const createIndicatorBulk = async (req, res) => {
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
          return res.json({
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

        // res.json();

        res.json({ message: 'Data berhasil dibuat' });

        // const majorId = await model.Major.findAll({
        //   attributes: ['major_id'],
        // });

        // const findIndicators = await model.Indicator.findAll({
        //   where: {
        //     indicator_code: indicator.map((item) => item.indicator_code),
        //   },
        // });

        // if (findIndicators.length !== 0) {
        //   const duplicatedID = findIndicators.map(
        //     (item) => item.indicator_code
        //   );

        //   return res.status(400).json({
        //     message: `Error! Indikator dengan id ${duplicatedID.join(
        //       ', '
        //     )} sudah terdapat pada sistem`,
        //   });
        // }

        // const indicators = await model.Indicator.bulkCreate(
        //   indicator.map((item) => {
        //     return {
        //       indicator_code: item.indicator_code,
        //       indicator_name: item.indicator_name,
        //       is_faculty_indicator: item.is_faculty_indicator,
        //       created_by: decodedVal.user_id,
        //     };
        //   })
        // );

        // await Promise.all(
        //   indicators.map(async (item) => {
        //     if (!item.is_faculty_indicator) {
        //       await model.MajorIndicator.bulkCreate(
        //         majorId.map((data) => {
        //           return {
        //             indicator_id: item.indicator_id,
        //             major_id: data.major_id,
        //           };
        //         })
        //       );
        //     }
        //   })
        // );

        // res.json({ message: 'Data berhasil dibuat' });
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = createIndicatorBulk;
