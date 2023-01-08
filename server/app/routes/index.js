const express = require('express');
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
  getTotalIndicator,
  createIndicator,
  getYear,
} = require('../controllers/indicator.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

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
router.get('/indicator/count', verifyAccessToken, getTotalIndicator);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);
router.get('/indicator/year/:id', verifyAccessToken, getIndicatorsByYear);
router.post('/indicator', verifyAccessToken, createIndicator);

// user routes
router.post('/users', registerUser);
router.post('/login', loginUser);
router.get('/auth-status', verifyAccessToken, authStatus);

module.exports = router;
