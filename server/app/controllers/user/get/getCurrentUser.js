require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? `.env.dev` : '.env',
});

const jwt = require('jsonwebtoken');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = require('../../../config/aws.config');

const getCurrentUser = async (req, res) => {
  try {
    const cookies = req.cookies.accessToken;

    if (!cookies) {
      return res.sendStatus(401);
    }

    // verify the jwt token inside cookies
    jwt.verify(
      cookies,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedVal) => {
        if (err) {
          return res.sendStatus(403);
        }

        let role = '';

        if (decodedVal.role_id === 1) {
          role = 'Manajemen';
        } else if (decodedVal.role_id === 2) {
          role = 'Operator';
        } else if (decodedVal.role_id === 9) {
          role = 'Admin';
        }

        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: decodedVal.user_image,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return res.json({
          profession: decodedVal.profession,
          email: decodedVal.email,
          userImage: url,
          role,
        });
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = getCurrentUser;
