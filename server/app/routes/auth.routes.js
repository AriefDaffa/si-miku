const express = require('express');

const loginUser = require('../controllers/auth/login');
const authStatus = require('../controllers/auth/auth-status');
const logout = require('../controllers/auth/logout');
const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/auth-status', verifyAccessToken, authStatus);
router.post('/login', loginUser);
router.delete('/logout', logout);

module.exports = router;
