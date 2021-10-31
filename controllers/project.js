const Project = require('../models/project')
const bodyParser = require('body-parser');
const comment = require('../models/comment');

//insert a project
module.exports.addProject = async (req, res) => {
    const { projectName, location, description, expectDays, areaSqft, noOfFloor, expectedCost, image, likes, userId } = req.body;
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
            image : image,
            likes: likes,
            userId: id
        });
        newProject.save().then((project) => {
                return res.status(201).json({ message: "Project saved successfully." });
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  };

//Find all the project for builder
module.exports.project = (req, res)=>{
        Project.find({status : pending}).populate('userId', 'userName')
            //.select("-password")
            .then((project) => {
                res.json(project);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  }

//find the project of specific user
module.exports.myProject = (req, res)=>{
        const pId = req.user._id
        Project.find({userId : pId})
        .then((project) => {
            res.json(project);
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        });
}