const mongoose = require("mongoose");

const createProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    location:
    {
        type: String,
        required: true
    },
    deccription:
    {
        type: String,
        required: true
    },
    expectDays:
    {
        type: Number,
        required: true
    },

    areaSqft:
    {
        type: Number,
        required: true
    },
    noOfFloor:
    {
        type: Number,
        required: true
    },
    expectedCost:
    {
        type: Number,
        required: true
    },

    image:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("projectDetails", createProjectSchema);
