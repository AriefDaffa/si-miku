const express = require('express');
const multer = require('multer');
const {
  getUsers,
  getUserByRole,
  getRoles,
  registerUser,
  getCurrentUser,
  getUserRole,
} = require('../controllers/user.controller');
const {
  loginUser,
  logout,
  authStatus,
} = require('../controllers/auth.controller');
const {
  getAllIndicators,
  getIndicatorById,
  getIndicatorsByYear,
  getIndicatorCount,
  createIndicator,
  getYear,
  getTargetQuarterByYear,
  getIndicatorByMajorId,
  deleteIndicatorById,
  createBulkIndicator,
} = require('../controllers/indicator.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage });

// @TODO split the router

// user routes
router.get('/users', verifyAccessToken, getUsers);
router.get('/roles', verifyAccessToken, getRoles);
router.get('/users/roles/:id', verifyAccessToken, getUserByRole);
router.get('/current-user', verifyAccessToken, getCurrentUser);
router.get('/current-user-role', verifyAccessToken, getUserRole);
router.delete('/logout', logout);

// year routes
router.get('/year', verifyAccessToken, getYear);

// Indicator routes
router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/overview', verifyAccessToken, getIndicatorCount);
router.get(
  '/indicator/target-quarter',
  verifyAccessToken,
  getTargetQuarterByYear
);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);
router.get('/indicator/year/:id', verifyAccessToken, getIndicatorsByYear);
router.get('/indicator/major/:id', verifyAccessToken, getIndicatorByMajorId);
router.post('/indicator', verifyAccessToken, createIndicator);
router.post(
  '/indicator/bulk',
  [verifyAccessToken, upload.single('csv-file')],
  createBulkIndicator
);
router.delete('/indicator', verifyAccessToken, deleteIndicatorById);

// user routes
router.post('/users', registerUser);
router.post('/login', loginUser);
router.get('/auth-status', verifyAccessToken, authStatus);

module.exports = router;
