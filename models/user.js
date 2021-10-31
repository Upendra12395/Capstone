const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, required : true },
    email: {type: String, unique:true, required : true},
    password: {type: String, required : true},
    dob: {type:String, required : true},
    gender:{type: String},
    about:{type: String},
    occupation:{type: String},
    project:[{type:mongoose.Schema.Types.ObjectId, ref:'Project'}]
    
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);