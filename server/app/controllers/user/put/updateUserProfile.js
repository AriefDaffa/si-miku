require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? `.env.dev` : '.env',
});
const jwt = require('jsonwebtoken');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const model = require('../../../models');
const s3 = require('../../../config/aws.config');

const updateUserProfile = async (req, res) => {
  try {
    const file = req.file;
    const { user_email } = req.body;

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
        user_email,
      },
      attributes: [
        'user_id',
        'profession',
        'user_email',
        'user_image',
        'role_id',
      ],
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    user.user_image = imageName;

    await user.save();

    const accessToken = jwt.sign(
      {
        profession: user.profession,
        email: user.user_email,
        user_id: user.user_id,
        role_id: user.role_id,
        user_image: user.user_image,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    );

    // set http-only cookie
    await res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'none',
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

module.exports = updateUserProfile;
