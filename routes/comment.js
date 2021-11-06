const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')
const builderAuth = require('../middlewares/builderAuth')
const userAuth = require('../middlewares/userAuth')

router.post('/addComment/:id', builderAuth, commentController.makeBid) // make a bid for any project
router.get('/', userAuth, commentController.allComment) // show all request
router.get('/:id', userAuth, commentController.comment) // show all request for a Project

module.exports = router