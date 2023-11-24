const express = require('express');

const registrationController = require('../../controllers/registrationController');
const otpController = require('../../controllers/otpController');
const router = express.Router();

router.post('/registration', registrationController)
router.post('/otpVerify', otpController)

module.exports = router;
