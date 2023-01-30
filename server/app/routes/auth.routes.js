const express = require('express');
const {
  loginUser,
  logout,
  authStatus,
} = require('../controllers/auth.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/auth-status', verifyAccessToken, authStatus);
router.post('/login', loginUser);
router.delete('/logout', logout);

module.exports = router;
