const express = require('express');
const {
  getAllIndicators,
  getIndicatorById,
  getIndicatorsByYear,
  getIndicatorCount,
  createIndicator,
  createIndicatorDataByMajor,
  getTargetQuarterByYear,
  getIndicatorByMajorId,
  deleteIndicatorById,
  deleteIndicatorData,
  getOverviewMajor,
  getYear,
} = require('../controllers/indicator.controller.js');
const { verifyAccessToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/overview', verifyAccessToken, getIndicatorCount);
router.get('/indicator/overview/major', verifyAccessToken, getOverviewMajor);
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
router.post(
  '/indicator/add-major',
  verifyAccessToken,
  createIndicatorDataByMajor
);
router.delete('/indicator', verifyAccessToken, deleteIndicatorById);
router.delete('/indicator-data', verifyAccessToken, deleteIndicatorData);

module.exports = router;
