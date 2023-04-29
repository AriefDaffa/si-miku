const express = require('express');

const getAllIndicators = require('../controllers/indicator/get-all-indicator');
const getIndicatorById = require('../controllers/indicator/get-indicator-by-id');
const getOverviewIndicator = require('../controllers/indicator/get-overview-indicator');
const getFakultasIndicators = require('../controllers/indicator/get-fakultas-indicator');
const getIndicatorByMajorId = require('../controllers/indicator/get-indicator-by-major-id');

const createIndicator = require('../controllers/indicator/post-indicator');
const createIndicatorBulk = require('../controllers/indicator/post-indicator-bulk');
const postDataFacultyIndicator = require('../controllers/indicator/post-data-faculty-indicator');
const createMajorData = require('../controllers/indicator/post/createMajorData');
const createDepartmentData = require('../controllers/indicator/post/createDepartmentData');
const createFacultyData = require('../controllers/indicator/post/createFacultyData');

const updateIndicatorName = require('../controllers/indicator/put-indicator-name');
const updateIndicatorData = require('../controllers/indicator/put-indicator-data');
const updateIndicatorType = require('../controllers/indicator/put-indicator-type');

const editMajorData = require('../controllers/indicator/put/editMajorData');
const editDepartmentData = require('../controllers/indicator/put/editDepartmentData');

const deleteIndicatorById = require('../controllers/indicator/delete-indicator-by-id');
const deleteDataIndicator = require('../controllers/indicator/delete-data-indicator');
const deleteBulkDataIndicator = require('../controllers/indicator/delete-bulk-data-indicator');
const deleteMajorData = require('../controllers/indicator/delete/deleteMajorData');
const deleteDepartmentData = require('../controllers/indicator/delete/deleteDepartmentData');

const getIndicatorFacultyData = require('../controllers/indicator/get/getIndicatorFacultyData');
const {
  verifyAccessToken,
  verifyManagement,
} = require('../middleware/verifyToken');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/faculty', verifyAccessToken, getIndicatorFacultyData);
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
router.post('/indicator/data/major', verifyManagement, createMajorData);
router.post(
  '/indicator/data/department',
  verifyManagement,
  createDepartmentData
);
router.post('/indicator/data/faculty', verifyManagement, createFacultyData);

router.delete('/indicator', verifyManagement, deleteIndicatorById);
router.delete('/indicator/data', verifyManagement, deleteDataIndicator);
router.delete('/indicator/data/major', verifyManagement, deleteMajorData);
router.delete(
  '/indicator/data/department',
  verifyManagement,
  deleteDepartmentData
);

router.put('/indicator/:id', verifyManagement, updateIndicatorName);
router.put('/indicator/:id/type', verifyManagement, updateIndicatorType);
router.put('/indicator/:id/data/major', verifyManagement, editMajorData);
router.put(
  '/indicator/:id/data/department',
  verifyManagement,
  editDepartmentData
);

module.exports = router;
