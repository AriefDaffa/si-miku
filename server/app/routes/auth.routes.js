const express = require('express');

const loginUser = require('../controllers/auth/post/login');
const authStatus = require('../controllers/auth/get/authStatus');
const logout = require('../controllers/auth/delete/logout');
const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/auth-status', verifyAccessToken, authStatus);
router.post('/login', loginUser);
router.delete('/logout', logout);

module.exports = router;
