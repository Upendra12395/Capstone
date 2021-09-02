const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        types: "string", 
    },
    email: {
        type: "string",
        unique:true
    },
    password: {
		type: "string",
	},
    dob: {
        type:"string",
    }
    
})

module.exports = mongoose.model('User', userSchema);