const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder');
const builderAuth = require("../middlewares/builderAuth");

router.post('/signup', builderController.signup); // route to register builder
router.post('/login', builderController.login); // route to login for builder
router.get('/', builderAuth, builderController.getAll); // route to list out all builders


module.exports = router;