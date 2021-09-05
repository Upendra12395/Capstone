const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder');
const checkAuthBuilder = require('../middlewares/Authbuilder');

router.post('/signup', builderController.signup);
router.post('/login', checkAuthBuilder, builderController.login);

module.exports = router;