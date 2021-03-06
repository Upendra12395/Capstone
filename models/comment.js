const mongoose = require('mongoose');

const commentSchema= new mongoose.Schema({
    comment: {type: String, required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    builder:{type: mongoose.Schema.Types.ObjectId, ref:'Builder'}
},
{timestamps:true});

module.exports = mongoose.model("Comment", commentSchema);