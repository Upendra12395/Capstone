const express = require('express');
const router = express.Router();
const createProjectController = require('../controllers/createProject');
const checkAuthOwner = require('../middlewares/AuthOwner');


router.post('/addProject', checkAuthOwner, createProjectController.addProject)
router.get('/project', checkAuthOwner, createProjectController.project)

module.exports = router
