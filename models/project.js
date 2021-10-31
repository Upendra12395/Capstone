const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{type: String, required: true},
    location:{type: String, required: true},
    description:{type:String, required:true},
    expectDays:{type:Number, required:true},
    areaSqft:{type: Number, required:true},
    noOfFloor:{type: Number, required:true},
    expectedCost:{type: Number, required: true},
    status : { type : String, default : "pending"},
    image:{type:String, required:true,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Green_Building_-_MIT%2C_Cambridge%2C_MA_-_DSC05589.jpg/800px-Green_Building_-_MIT%2C_Cambridge%2C_MA_-_DSC05589.jpg"
    },
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'Builder'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    user:{type:mongoose.Schema.Types.ObjectId, ref : 'User'}
}, 
{timestamps:true})

module.exports = mongoose.model('Project', projectSchema)