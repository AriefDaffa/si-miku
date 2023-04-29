const express = require('express');

const getYear = require('../controllers/year/get-year');

const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/year', verifyAccessToken, getYear);

module.exports = router;
