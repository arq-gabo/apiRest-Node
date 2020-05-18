const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');

const sessionController = require('../controllers/SessionsController');

router.route('/')
  .post(userController.create,
        sessionController.generateToken,
        sessionController.sendToken );

module.exports = router;
