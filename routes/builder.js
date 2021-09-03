const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder');
const checkAuth = require("../middlewares/checkAuth");

router.post('/signup', builderController.signup);
router.post('/login', builderController.login);
router.get('/', checkAuth, builderController.getAll);


module.exports = router;