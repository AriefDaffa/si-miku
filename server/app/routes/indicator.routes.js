const express = require('express');

const getAllIndicators = require('../controllers/indicator/get-all-indicator');
const getIndicatorById = require('../controllers/indicator/get-indicator-by-id');
const getOverviewIndicator = require('../controllers/indicator/get-overview-indicator');
const getFakultasIndicators = require('../controllers/indicator/get-fakultas-indicator');
const getIndicatorByMajorId = require('../controllers/indicator/get-indicator-by-major-id');

const createIndicator = require('../controllers/indicator/post-indicator');
const createIndicatorBulk = require('../controllers/indicator/post-indicator-bulk');
const postDataFacultyIndicator = require('../controllers/indicator/post-data-faculty-indicator');
const postDataMajorIndicator = require('../controllers/indicator/post-data-major-indicator');

const updateIndicatorName = require('../controllers/indicator/put-indicator-name');
const updateIndicatorData = require('../controllers/indicator/put-indicator-data');

const deleteIndicatorById = require('../controllers/indicator/delete-indicator-by-id');
const deleteDataIndicator = require('../controllers/indicator/delete-data-indicator');
const deleteBulkDataIndicator = require('../controllers/indicator/delete-bulk-data-indicator');

const {
  verifyAccessToken,
  verifyManagement,
} = require('../middleware/verifyToken');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/overview', verifyAccessToken, getOverviewIndicator);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);
router.get('/fakultas', verifyAccessToken, getFakultasIndicators);
router.get('/indicator/major/:id', verifyAccessToken, getIndicatorByMajorId);

router.post('/indicator', verifyManagement, createIndicator);
router.post('/indicator-bulk', verifyManagement, createIndicatorBulk);
router.post(
  '/indicator/insert-data-faculty',
  verifyManagement,
  postDataFacultyIndicator
);
router.post(
  '/indicator/insert-data-major',
  verifyManagement,
  postDataMajorIndicator
);

router.delete('/indicator', verifyManagement, deleteIndicatorById);
router.delete('/indicator/data', verifyManagement, deleteDataIndicator);
// router.delete(
//   '/indicator-data/bulk',
//   verifyManagement,
//   deleteBulkDataIndicator
// );

router.put('/indicator/:id', verifyManagement, updateIndicatorName);
router.put('/indicator/:id/data', verifyManagement, updateIndicatorData);

module.exports = router;
