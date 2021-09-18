const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')

router.post('/addComment', commentController.makeBid) // make a bid for any project
router.get('/', commentController.comment) // show all request
router.get('/:id', commentController.comment) // show all request for a Project
router.patch('/:id', commentController.updateProject)

module.exports = router