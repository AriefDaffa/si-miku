const express = require('express');

// const getOverviewMajor = require('../controllers/major/get-overview-major');
const getAllMajor = require('../controllers/major/get/getAllMajor');
const getMajorById = require('../controllers/major/get/getMajorById');

const createMajor = require('../controllers/major/post/createMajor');

const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/major', verifyAccessToken, getAllMajor);
router.get('/major/:id', verifyAccessToken, getMajorById);
// router.get('/major/overview', verifyAccessToken, getOverviewMajor);

router.post('/major', verifyAccessToken, createMajor);

module.exports = router;
