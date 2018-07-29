const express = require('express');
const router = express.Router();

// items controller
const authController = require('../../controller/auth.controller');

// @route GET api/auth/register
// @desc Register for new user
// @access Public
router.post('/register', authController.register);

// @route GET api/auth/login
// @desc Login user
// @access Public
router.post('/login', authController.login);

module.exports = router;