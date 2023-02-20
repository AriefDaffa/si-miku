const express = require('express');

const { getMajor, createMajor } = require('../controllers/major.controller');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/major', verifyAccessToken, getMajor);
router.post('/major', verifyAccessToken, createMajor);

module.exports = router;
