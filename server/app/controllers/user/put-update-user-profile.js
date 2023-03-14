const model = require('../../models');

const updateUserProfile = async (req, res) => {
  const { user_name, user_email } = req.body;

  try {
    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_email,
      },
      attributes: ['user_id', 'user_email', 'user_name'],
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    user.user_name = user_name;

    await user.save();

    // jwt.verify(cookies, process.env.ACCESS_TOKEN_SECRET, (err, decodedVal) => {
    //     if (err) {
    //       return res.sendStatus(403);
    //     }

    //     return res.json({
    //       username: decodedVal.username,
    //       email: decodedVal.email,
    //       userImage: decodedVal.user_image,
    //     });
    //   });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateUserProfile;
