const Project = require('../models/project')
const bodyParser = require('body-parser');
const comment = require('../models/comment');

module.exports.addProject = async (req, res) => {
    const { projectName, location, description, expectDays, areaSqft, noOfFloor, expectedCost, image, likes, userId } = req.body;
	if (!projectName || !location || !description || !expectDays || !areaSqft || !noOfFloor || !expectedCost) {
		return res.status(400).json({ message: "please enter all fieds" });
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
            userId: userId
        });
        newProject.save().then((project) => {
                return res.status(201).json({ message: "Project saved successfully." });
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  };

module.exports.project = (req, res)=>{
        Project.find().populate('userId', 'userName')
            .select("-password")
            .then((project) => {
                res.json(project);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  }