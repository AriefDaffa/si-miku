const express = require('express');
const multer = require('multer');

const getUser = require('../controllers/user/get/getUserByRole');
const getCurrentUser = require('../controllers/user/get/getCurrentUser');
const deleteUser = require('../controllers/user/delete/deleteUser');
const updateUserProfile = require('../controllers/user/put/updateUserProfile');
const registerUser = require('../controllers/user/post/registerUser');
const updateUserPassword = require('../controllers/user/put/updateUserPassword');

const {
  verifyAccessToken,
  verifyAdmin,
} = require('../middleware/verifyToken.js');
const editUser = require('../controllers/user/put/editUser');

const router = express.Router();

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images/user-profile');
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

router.get('/users/:id', verifyAdmin, getUser);
router.get('/current-user', verifyAccessToken, getCurrentUser);

// router.post('/users', registerUser);
router.post('/users', verifyAdmin, registerUser);

router.put(
  '/profile',
  [verifyAccessToken, upload.single('profile-image')],
  updateUserProfile
);
router.put(
  '/profile/password',
  [verifyAccessToken, upload.single('profile-image')],
  updateUserPassword
);
router.put(
  '/user/:id',
  [verifyAdmin, upload.single('profile-image')],
  editUser
);

router.delete('/user/:id', verifyAdmin, deleteUser);

module.exports = router;
