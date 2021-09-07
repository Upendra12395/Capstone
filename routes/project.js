const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')


router.post('/addProject', projectController.addProject)
router.get('/project', projectController.project)

module.exports = router