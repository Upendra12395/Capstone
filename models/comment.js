const mongoose = require('mongoose');

const commentSchema= new mongoose.Schema({
    comment: {type: String, required: true},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    builderId:{type: mongoose.Schema.Types.ObjectId, ref:'Builder'}
},
{timestamps:true});

module.exports = mongoose.model("Comment", commentSchema);