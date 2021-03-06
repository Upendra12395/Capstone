const Project = require('../models/project')
const bodyParser = require('body-parser');
const comment = require('../models/comment');
const User = require('../models/user')
const Builder = require('../models/builder');

//insert a project
module.exports.addProject = async (req, res) => {
    const { projectName, location, description, expectDays, areaSqft, noOfFloor, expectedCost, status, image, likes, userId } = req.body;
	const id = req.user._id
    if (!projectName || !location || !description || !expectDays || !areaSqft || !noOfFloor || !expectedCost) {
		return res.status(400).json({ message: "please enter all fields" });
	}
        const newProject = new Project({
            projectName: projectName,
            location: location,
            description: description,
            expectDays: expectDays,
            areaSqft : areaSqft,
            noOfFloor : noOfFloor,
            expectedCost : expectedCost,
            status : status,
            image : image,
            likes: likes,
            user: id
        });
        newProject.save().then((project) => {
                User.findById(id).then((user)=>{
                    user.project.push(project._id)
                    user.save()
                })
                return res.status(200).json({ message: "Project saved successfully." });
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  };

//Find all the project for builder
module.exports.project = (req, res)=>{
        Project.find({status : "pending"}).populate('user', 'userName')
            //.select("-password")
            .then((project) => {
                res.status(200).json(project);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  }

//find the project of specific user
module.exports.myProject = (req, res)=>{
        const pId = req.user._id
        Project.find({user : pId}).populate('user', 'userName')
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        });
}

module.exports.addLike = (req, res) =>{
    const projectId = req.params.id
    const builderId = req.builder._id
    Project.findById(projectId).then((project)=>{
        project.likes.push(builderId)
        project.save()
        Builder.findById(builderId).then((builder=>{
            builder.likes.push(projectId)
            builder.save()
        }))
        res.status(200).json({message : "Liked"})
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}

module.exports.getProjectByLocation = (req, res)=>{
    const location = req.params.id
    Project.find({location : location})
    .then(project =>{
        if(project){
            res.status(200).json(project)
        }else{
            res.status(404).json({message : 'Project not available for this location'})
        }
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}

module.exports.getProjectSortedByPostedDate = (req, res) =>{
    Project.find().sort({ createdAt: 1 })
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}