const jwt = require('jsonwebtoken');
const model = require('../../models');

const createIndicator = async (req, res) => {
  const { indicator_code, indicator_name, is_faculty_indicator } = req.body;
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

        const findIndicators = await model.Indicator.findOne({
          where: {
            indicator_code,
          },
        });

        if (findIndicators) {
          return res.status(400).json({
            message: 'Error! Indikator sudah terdapat pada sistem',
          });
        }

        const indicators = await model.Indicator.create({
          indicator_code,
          indicator_name,
          is_faculty_indicator,
          created_by: decodedVal.user_id,
        });

        if (is_faculty_indicator === false) {
          await model.MajorIndicator.bulkCreate(
            majorId.map((data) => {
              return {
                indicator_id: indicators.indicator_id,
                major_id: data.major_id,
              };
            })
          );
        }

        res.json({ message: 'Data berhasil ditambahkan!' });
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = createIndicator;
