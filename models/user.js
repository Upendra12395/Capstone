const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: "string",
        required : true 
    },
    email: {
        type: "string",
        unique:true,
        required : true
    },
    password: {
		type: "string",
        required : true
	},
    dob: {
        type:"string",
        required : true
    }
    
})

module.exports = mongoose.model('User', userSchema);