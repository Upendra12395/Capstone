const Comment = require("../models/comment");
const Project = require("../models/project");
const bodyParser = require('body-parser');
const Builder = require('../models/builder')

// make a bid on a project
module.exports.makeBid = async (req, res) => {
	const { comment } = req.body;
	if (!comment) {
		return res.status(400).json({ message: "please enter all fields" });
	}

	const id = req.builder._id
	const projectId = req.params.id
	const newComment = new Comment({
		comment: comment,
		project: projectId,
		builder: id
	});
	newComment.save()
		.then((comment) => {
			// saving comment id in builder collection
			Builder.findById(id).then((builder) => { 
				builder.comments.push(comment._id)
				builder.save()
			})
			// saving comment id in project collection
			Project.findById(projectId).then((project) => { 
				project.comments.push(comment._id)
				project.save()
			})
			return res.status(201).json({ message: "Comment saved successfully." });
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});

};


// Show all requests
module.exports.allComment = (req, res) => {
	Comment.find()
		.select("-password")
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

// Show all requests on a project
module.exports.comment = (req, res) => {
	Comment.find({ project: req.params.id }).populate('builder', 'builderName')
		.select("-password")
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};