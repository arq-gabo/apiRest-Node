const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const applicationsController = require('../controllers/applicationsController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.route('/')
  .get(jwtMiddleware({secret: secrets.jwtSecret}),applicationsController.index)
  .post(applicationsController.create);

router.route('/:visit_id')
    .delete(applicationsController.find, authenticateOwner, applicationsController.destroy)

module.exports = router;