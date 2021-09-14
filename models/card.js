const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    status:{
        type:String,
        require: true,
        default:"Active"
    },
    likes:{
        type:Number,
        require:true,
        default:10
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }
})