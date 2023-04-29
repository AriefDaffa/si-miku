const express = require('express');

const getAllDepartment = require('../controllers/department/get-all-department');
const getDepartmentYears = require('../controllers/department/get-department-year');
const getDepartmentByID = require('../controllers/department/get-department-by-id');

const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/department', verifyAccessToken, getAllDepartment);
router.get('/department/:id', verifyAccessToken, getDepartmentByID);
router.get('/years/department', verifyAccessToken, getDepartmentYears);

module.exports = router;
