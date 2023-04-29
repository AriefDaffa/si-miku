const express = require('express');

const getOverviewMajor = require('../controllers/major/get-overview-major');
const getMajor = require('../controllers/major/get-major');
const getMajorById = require('../controllers/major/get-major-by-id');

const createMajor = require('../controllers/major/post-major');

const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/major', verifyAccessToken, getMajor);
router.get('/major/:id', verifyAccessToken, getMajorById);
router.get('/major/overview', verifyAccessToken, getOverviewMajor);

router.post('/major', verifyAccessToken, createMajor);

module.exports = router;
