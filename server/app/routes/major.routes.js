const express = require('express');
const { getMajor } = require('../controllers/major.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/major', verifyAccessToken, getMajor);

module.exports = router;
