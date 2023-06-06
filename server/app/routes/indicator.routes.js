const express = require('express');

const getAllIndicators = require('../controllers/indicator/get/getAllIndicator');
const getIndicatorById = require('../controllers/indicator/get/getIndicatorById');
const getIndicatorOverview = require('../controllers/indicator/get/getIndicatorOverview');
const getIndicatorOverviewByYear = require('../controllers/indicator/get/getIndicatorOverviewByYear');

const createIndicator = require('../controllers/indicator/post/createIndicator');
const createMajorData = require('../controllers/indicator/post/createMajorData');
const createMajorBulkData = require('../controllers/indicator/post/createMajorBulkData');
const createDepartmentData = require('../controllers/indicator/post/createDepartmentData');
const createDepartmentBulkData = require('../controllers/indicator/post/createDepartmentBulkData');
const createFacultyData = require('../controllers/indicator/post/createFacultyData');

const updateIndicator = require('../controllers/indicator/put/editIndicator');
const updateIndicatorType = require('../controllers/indicator/put/editIndicatorType');

const editMajorData = require('../controllers/indicator/put/editMajorData');
const editDepartmentData = require('../controllers/indicator/put/editDepartmentData');
const editFacultyData = require('../controllers/indicator/put/editFacultyData');
const deleteMajorData = require('../controllers/indicator/delete/deleteMajorData');
const deleteDepartmentData = require('../controllers/indicator/delete/deleteDepartmentData');
const deleteFacultyData = require('../controllers/indicator/delete/deleteFacultyData');
const deleteIndicator = require('../controllers/indicator/delete/deleteIndicator');

const getIndicatorFacultyData = require('../controllers/indicator/get/getIndicatorFacultyData');
const {
  verifyAccessToken,
  verifyManagement,
  verifyAdmin,
} = require('../middleware/verifyToken');

const router = express.Router();

router.get('/indicator', verifyAccessToken, getAllIndicators);
router.get('/indicator/faculty', verifyAccessToken, getIndicatorFacultyData);
router.get('/indicator/overview', verifyAccessToken, getIndicatorOverview);
router.get(
  '/indicator/overview/year',
  verifyAccessToken,
  getIndicatorOverviewByYear
);
router.get('/indicator/:id', verifyAccessToken, getIndicatorById);

router.post('/indicator', verifyAdmin, createIndicator);
router.post('/indicator/data/major', verifyManagement, createMajorData);
router.post(
  '/indicator/data/major/bulk',
  verifyManagement,
  createMajorBulkData
);
router.post(
  '/indicator/data/department',
  verifyManagement,
  createDepartmentData
);
router.post(
  '/indicator/data/department/bulk',
  verifyManagement,
  createDepartmentBulkData
);
router.post('/indicator/data/faculty', verifyManagement, createFacultyData);

router.delete('/indicator/:id', verifyAdmin, deleteIndicator);
router.delete('/indicator/data/faculty', verifyManagement, deleteFacultyData);
router.delete('/indicator/data/major', verifyManagement, deleteMajorData);
router.delete(
  '/indicator/data/department',
  verifyManagement,
  deleteDepartmentData
);

router.put('/indicator/:id', verifyAdmin, updateIndicator);
router.put('/indicator/:id/type', verifyAdmin, updateIndicatorType);
router.put('/indicator/:id/data/faculty', verifyManagement, editFacultyData);
router.put('/indicator/:id/data/major', verifyManagement, editMajorData);
router.put(
  '/indicator/:id/data/department',
  verifyManagement,
  editDepartmentData
);

module.exports = router;
