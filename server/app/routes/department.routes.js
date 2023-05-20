const express = require('express');

const getAllDepartment = require('../controllers/department/get/getAllDepartment');
const getDepartmentByID = require('../controllers/department/get/getDepartmentById');

const { verifyAccessToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/department', verifyAccessToken, getAllDepartment);
router.get('/department/:id', verifyAccessToken, getDepartmentByID);

module.exports = router;
