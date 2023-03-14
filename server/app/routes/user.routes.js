const express = require('express');
const {
  getUserByRole,
  getRoles,
  registerUser,
  getCurrentUser,
  getUserRole,
} = require('../controllers/user.controller');

const getUser = require('../controllers/user/get-user');
const createOperator = require('../controllers/user/post-user-operator');
const deleteUser = require('../controllers/user/delete-user');
const updateUserProfile = require('../controllers/user/put-update-user-profile');

const {
  verifyAccessToken,
  verifyManagement,
} = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/users/:id', verifyManagement, getUser);
router.get('/roles', verifyAccessToken, getRoles);
router.get('/users/roles/:id', verifyAccessToken, getUserByRole);
router.get('/current-user', verifyAccessToken, getCurrentUser);
router.get('/current-user-role', verifyManagement, getUserRole);

router.post('/users', verifyManagement, registerUser);
router.post('/users/operator', verifyManagement, createOperator);

router.put('/user', verifyAccessToken, updateUserProfile);

router.delete('/user', verifyManagement, deleteUser);

module.exports = router;
