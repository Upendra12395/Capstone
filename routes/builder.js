const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder');
const userAuth = require("../middlewares/userAuth");
const builderAuth = require('../middlewares/builderAuth')

router.post('/signup', builderController.signup); // route to register builder
router.post('/login', builderController.login); // route to login for builder
router.get('/', userAuth, builderController.getAll); // route to list out all builders
router.patch('/updateProfile', builderAuth, builderController.updateProfile)



module.exports = router;