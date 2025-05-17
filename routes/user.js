const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const verifyToken = require('../app/middleware/auth');

router.get('/', verifyToken, UserController.getUsers);
router.post('/update', verifyToken, UserController.updateUsers);

module.exports = router;
