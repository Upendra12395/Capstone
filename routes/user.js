const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userAuth = require('../middlewares/userAuth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userAuth, userController.getAll);


module.exports = router;