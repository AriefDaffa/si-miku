const express = require('express');

const getAllIndicators = require('../controllers/indicator/get-all-indicator');
const getIndicatorById = require('../controllers/indicator/get-indicator-by-id');
const getOverviewIndicator = require('../controllers/indicator/get-overview-indicator');
const getFakultasIndicators = require('../controllers/indicator/get-fakultas-indicator');

const createIndicator = require('../controllers/indicator/post-indicator');
const createIndicatorBulk = require('../controllers/indicator/post-indicator-bulk');
const postDataFacultyIndicator = require('../controllers/indicator/post-data-faculty-indicator');
const postDataMajorIndicator = require('../controllers/indicator/post-data-major-indicator');

const updateIndicatorName = require('../controllers/indicator/put-indicator-name');

const deleteIndicatorById = require('../controllers/indicator/delete-indicator-by-id');
const deleteDataIndicator = require('../controllers/indicator/delete-data-indicator');

const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/overview', verifyAccessToken, getOverviewIndicator);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);
router.get('/fakultas', verifyAccessToken, getFakultasIndicators);

router.post('/indicator', verifyAccessToken, createIndicator);
router.post('/indicator-bulk', verifyAccessToken, createIndicatorBulk);
router.post(
  '/indicator/insert-data-faculty',
  verifyAccessToken,
  postDataFacultyIndicator
);
router.post(
  '/indicator/insert-data-major',
  verifyAccessToken,
  postDataMajorIndicator
);

router.delete('/indicator', verifyAccessToken, deleteIndicatorById);
router.delete('/indicator-data', verifyAccessToken, deleteDataIndicator);

router.put('/indicator/:id', verifyAccessToken, updateIndicatorName);

module.exports = router;
