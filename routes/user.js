const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userAuth = require('../middlewares/userAuth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAll);
router.patch('/updateProfile', userAuth, userController.updateProfile)


module.exports = router;