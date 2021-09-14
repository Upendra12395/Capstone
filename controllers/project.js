const Project = require('../models/project')
const bodyParser = require('body-parser')

module.exports.addProject = async (req, res) => {
    const { projectName, location, deccription, expectDays, areaSqft, noOfFloor, expectedCost, image } = req.body;
	if (!projectName || !location || !deccription || !expectDays || !areaSqft || !noOfFloor || !expectedCost || !image) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
        const newProject = new Project({
            projectName: projectName,
            location: location,
            deccription: deccription,
            expectDays: expectDays,
            areaSqft : areaSqft,
            noOfFloor : noOfFloor,
            expectedCost : expectedCost,
            image : image
        });
        newProject.save().then((project) => {
                return res.status(201).json({ message: "Project saved successfully." });
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  };

module.exports.project = (req, res)=>{
        Project.find()
            .select("-password")
            .then((project) => {
                res.json(project);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
  }