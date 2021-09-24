const mongoose = require("mongoose")

module.exports.getCard = (req, res) => {

    matchobj = mongoose.Types.ObjectId(req.query)
    let arg = {
        query: [
            {
                $match: { ...matchobj }

            },
            {
                $lookup: {
                    from: "project",
                    localField: "projectName",
                    foreignField: "_id",
                    as: "Project1"
                }

            },
            { $unwind: $Project1 },
            {
                $card: {
                    status: 1,
                    likes: 1,
                    projectN: $Project1.projectName
                }
            }
        ]
    }
    res.status(200).send(arg)
}