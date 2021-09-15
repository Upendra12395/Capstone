const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')


router.post('/addComment', commentController.addComment)
router.get('/', commentController.comment)

module.exports = router