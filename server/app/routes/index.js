const express = require('express');
const {
  getUsers,
  getUserByRole,
  getRoles,
  registerUser,
} = require('../controllers/user.controller');
const { loginUser } = require('../controllers/auth.controller');
const {
  getAllIndicators,
  getIndicatorById,
  getIndicatorsByYear,
  getTotalIndicator,
  createIndicator,
} = require('../controllers/indicator.controller');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

// user routes
router.get('/users', verifyToken, getUsers);
router.get('/roles', verifyToken, getRoles);
router.get('/users/roles/:id', verifyToken, getUserByRole);

// Indicator routes
router.get('/indicator', verifyToken, getAllIndicators);
router.get('/indicator/count', verifyToken, getTotalIndicator);
router.get('/indicator/:id', verifyToken, getIndicatorById);
router.get('/indicator/year/:id', verifyToken, getIndicatorsByYear);
router.post('/indicator', verifyToken, createIndicator);

// user routes
router.post('/users', registerUser);
router.post('/login', loginUser);

module.exports = router;
