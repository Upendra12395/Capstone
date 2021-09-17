const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')
const builderAuth = require("../middlewares/builderAuth");
const userAuth = require("../middlewares/userAuth");


router.post('/addProject', userAuth, projectController.addProject) //route to add project
router.get('/', builderAuth, projectController.project) // route to find all projects for builder
router.get('/:id', userAuth, projectController.myProject) //route to show user projects

module.exports = router