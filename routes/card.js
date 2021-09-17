const express = require('express')
const router = express.Router();
const cardController = require('../controllers/card')

router.get('/', cardController.getCard)

module.exports = router
