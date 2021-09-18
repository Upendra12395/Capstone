const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')

router.post('/addComment', commentController.makeBid) // make a bid for any project
router.get('/', commentController.requests) // show all request
router.get('/:id', commentController.requests) // show all request for a Project
router.patch('/:id', commentController.updateProject)

module.exports = router