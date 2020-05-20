const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const visitsController = require('../controllers/VisitsController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.route('/')
    .get(visitsController.index)
    .post(visitsController.create)

router.route('/:id')
    .delete(visitsController.find, authenticateOwner, visitsController.destroy)

module.exports = router;