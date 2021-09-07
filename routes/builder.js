const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder');
const builderAuth = require("../middlewares/builderAuth");

router.post('/signup', builderController.signup);
router.post('/login', builderController.login);
router.get('/', builderAuth, builderController.getAll);


module.exports = router;