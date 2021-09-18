const Comment = require("../models/comment");
const Project = require("../models/project");
const bodyParser = require('body-parser');

// make a bid on a project
module.exports.makeBid = (req, res) => {
	const { comment, projectId, builderId } = req.body;
	if (!comment || !projectId || !builderId) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
					const newComment = new Comment({
						comment: comment,
						projectId: projectId,
						builderId: builderId
					});
					newComment.save()
						.then((comment) => {
							return res.status(201).json({ message: "Comment saved successfully." });
						})
						.catch((error) => {
							return res.status(500).json({ message: error.message });
						});
            
};


module.exports.updateProject = async (req, res) => {
    try {
      await Project.findByIdAndUpdate(request.params.id, request.body);
      await Project.save();
    } catch (error) {
      response.status(500).send(error);
    }
  };

// Show all requests
module.exports.comment = (req, res) => {
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
	Comment.find({projectId:req.params.id}).populate('builderId', 'builderName')
		.select("-password")
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};