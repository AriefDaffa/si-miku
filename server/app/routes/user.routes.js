const express = require('express');
const multer = require('multer');

const getUser = require('../controllers/user/get-user');
const getCurrentUser = require('../controllers/user/get-current-user');
const createOperator = require('../controllers/user/post-user-operator');
const deleteUser = require('../controllers/user/delete-user');
const updateUserProfile = require('../controllers/user/put-update-user-profile');
const registerUser = require('../controllers/user/post-register-user');

const {
  verifyAccessToken,
  verifyManagement,
} = require('../middleware/verifyToken.js');

const router = express.Router();

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStore, fileFilter: fileFilter });

router.get('/users/:id', verifyManagement, getUser);
router.get('/current-user', verifyAccessToken, getCurrentUser);

router.post('/users', verifyManagement, registerUser);
router.post('/users/operator', verifyManagement, createOperator);

router.put(
  '/user',
  [verifyAccessToken, upload.single('image')],
  updateUserProfile
);

router.delete('/user', verifyManagement, deleteUser);

module.exports = router;
