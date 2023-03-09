const express = require('express');

const getAllIndicators = require('../controllers/indicator/get-all-indicator');
const getIndicatorById = require('../controllers/indicator/get-indicator-by-id');
const getIndicatorsByYear = require('../controllers/indicator/get-indicator-by-year');
const getIndicatorByMajorId = require('../controllers/indicator/get-indicator-by-major-id');
const getOverviewIndicator = require('../controllers/indicator/get-overview-indicator');
const getOverviewMajor = require('../controllers/indicator/get-overview-major');
const getTargetQuarterByYear = require('../controllers/indicator/get-target-quarter-by-year');
const getYear = require('../controllers/indicator/get-year');

const createIndicator = require('../controllers/indicator/post-indicator');
const postDataToIndicator = require('../controllers/indicator/post-data-to-indicator');

const updateIndicatorName = require('../controllers/indicator/put-indicator-name');

const deleteIndicatorById = require('../controllers/indicator/delete-indicator-by-id');
const deleteDataIndicator = require('../controllers/indicator/delete-data-indicator');

const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/overview', verifyAccessToken, getOverviewIndicator);
router.get('/major/overview', verifyAccessToken, getOverviewMajor);
router.get(
  '/indicator/target-quarter',
  verifyAccessToken,
  getTargetQuarterByYear
);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);
router.get('/indicator/year/:id', verifyAccessToken, getIndicatorsByYear);
router.get('/indicator/major/:id', verifyAccessToken, getIndicatorByMajorId);
router.get('/year', verifyAccessToken, getYear);
router.post('/indicator', verifyAccessToken, createIndicator);
router.post('/indicator/insert-data', verifyAccessToken, postDataToIndicator);
router.delete('/indicator', verifyAccessToken, deleteIndicatorById);
router.delete('/indicator-data', verifyAccessToken, deleteDataIndicator);
router.put('/indicator/:id', verifyAccessToken, updateIndicatorName);

module.exports = router;
