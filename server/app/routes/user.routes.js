const express = require('express');
const {
  getUsers,
  getUserByRole,
  getRoles,
  registerUser,
  getCurrentUser,
  getUserRole,
} = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/users', verifyAccessToken, getUsers);
router.get('/roles', verifyAccessToken, getRoles);
router.get('/users/roles/:id', verifyAccessToken, getUserByRole);
router.get('/current-user', verifyAccessToken, getCurrentUser);
router.get('/current-user-role', verifyAccessToken, getUserRole);
router.post('/users', registerUser);

module.exports = router;
