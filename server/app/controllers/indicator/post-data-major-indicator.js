const model = require('../../models');

const postDataMajorIndicator = async (req, res) => {
  try {
    const { indicator_id, indicator_major_data } = req.body;

    let data_array = [];

    //flatten array
    indicator_major_data.map((data) => {
      data.major_data.map((item) => {
        data_array.push({
          major_id: data.major_id,
          year_id: 0,
          is_target_fulfilled: false,
          major_indicator_id: 0,
          ...item,
        });
      });
    });

    // --- check if the indicator is available --- //
    const checkIndicator = await model.Indicator.findOne({
      where: {
        indicator_id,
      },
    });

    if (!checkIndicator) {
      return res.status(404).json({ message: 'Indicator Not Found!' });
    }

    await Promise.all(
      data_array.map(async (item, idx) => {
        const { q1, q2, q3, q4, target_value, year_value } = item;

        const total = q1 + q2 + q3 + q4;
        const is_target_fulfilled = total === 0 ? false : total >= target_value;

        const findYear = await model.Year.findOne({
          where: {
            year_value,
          },
        });

        if (!findYear) {
          const createdYear = await model.Year.create({
            year_value,
          });

          data_array[idx].year_id = createdYear.year_id;
        } else {
          data_array[idx].year_id = findYear.year_id;
        }

        data_array[idx].is_target_fulfilled = is_target_fulfilled;
      })
    );

    const majorIndicator = await model.MajorIndicator.findAll({
      where: {
        indicator_id,
        major_id: data_array.map((item) => item.major_id),
      },
    });

    const findDuplicate = await model.MajorIndicatorYear.findAll({
      where: {
        year_id: data_array.map((item) => item.year_id),
        major_indicator_id: majorIndicator.map(
          (item) => item.major_indicator_id
        ),
      },
    });

    if (findDuplicate.length > 0) {
      const temp_arr = [];
      const message = [];

      const findMajorIndicator = await model.MajorIndicator.findAll({
        where: {
          major_indicator_id: findDuplicate.map(
            (item) => item.major_indicator_id
          ),
        },
      });

      findMajorIndicator.map((item, idx) => {
        temp_arr.push({
          major_id: findMajorIndicator[idx].major_id,
          major_name: '',
          data: [],
        });

        const a = findDuplicate.filter(
          (data) => data.major_indicator_id === item.major_indicator_id
        );

        temp_arr[idx].data = a.map((item) => {
          return {
            year_id: item.year_id,
            year_value: data_array.find((data) => data.year_id === item.year_id)
              .year_value,
          };
        });
      });

      const major = await model.Major.findAll({
        where: {
          major_id: temp_arr.map((item) => item.major_id),
        },
      });

      major.map((item, idx) => {
        temp_arr[idx].major_name = item.major_name;
      });

      //create message

      temp_arr.map((item) => {
        message.push(
          `Jurusan '${item.major_name}' pada tahun [${item.data
            .map((item) => item.year_value)
            .join(', ')}]`
        );
      });

      // return res.json({ temp_arr });

      return res.status(400).json({
        message: `Error! Terdapat duplikasi data pada ${message.join(', ')}`,
      });
    }

    data_array.map((item, idx) => {
      const a = majorIndicator
        .filter((data) => data.major_id === item.major_id)
        .map((item) => item.major_indicator_id);

      data_array[idx].major_indicator_id = a[0];
    });

    await Promise.all(
      data_array.map(async (item) => {
        const {
          q1,
          q2,
          q3,
          q4,
          target_value,
          is_target_fulfilled,
          major_indicator_id,
          year_id,
        } = item;

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
          major_indicator_id,
          target_quarter_id: targetQuarter.target_quarter_id,
        });
      })
    );

    return res.json({ message: 'Data successfully created' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = postDataMajorIndicator;
