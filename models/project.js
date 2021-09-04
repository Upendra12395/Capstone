const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    deccription:{
        type:String,
        required:true
    },
    expectDays:{
        type:Number,
        required:true
    },
    areaSqft:{
        type: Number,
        required:true
    },
    noOfFloor:{
        type: Number,
        required:true
    },
    expectedCost:{
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Green_Building_-_MIT%2C_Cambridge%2C_MA_-_DSC05589.jpg/800px-Green_Building_-_MIT%2C_Cambridge%2C_MA_-_DSC05589.jpg"
    }
})

module.exports = mongoose.model('Project', projectSchema)