const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner');
const checkAuthOwner = require('../middlewares/AuthOwner');

router.post('/signup', ownerController.signup);
router.post('/login', checkAuthOwner, ownerController.login);


module.exports = router;