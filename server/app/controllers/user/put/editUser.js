require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? `.env.dev` : '.env',
});

const model = require('../../../models');
const s3 = require('../../../config/aws.config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const editUser = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const { profession, user_email, role_id, password } = req.body;

    const imageName = `${new Date().getTime() + '-' + file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: imageName,
      Body: file.buffer,
      ContentType: file.mymetype,
    });

    await s3.send(command);

    // check if there is duplicate email
    const user = await model.User.findOne({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'Error! User not found' });
    }

    user.profession = profession;
    user.user_image = imageName;
    user.user_email = user_email;
    user.password = password;
    user.role_id = role_id;

    await user.save();

    res.json({ message: 'User berhasil diubah' });
  } catch (error) {
    res.json(error);
  }
};

module.exports = editUser;
