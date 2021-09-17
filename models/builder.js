const mongoose = require('mongoose')

const builderSchema = new mongoose.Schema({
    builderName: {type: String, required : true },
    email: {type: String, unique:true, required : true},
    password: {type: String, required : true},
    dob: {type: String, required : true},
    gender:{type:String},
    about:{type: String},
    certificateNo:{type: String, required : true},
    commentId:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
    
})

module.exports = mongoose.model('Builder', builderSchema);