const mongoose = require('mongoose')

const builderSchema = new mongoose.Schema({
    userName: {
        type: "string", 
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
    },
    certificateNo:{
        type:"Number"
    }
    
})

module.exports = mongoose.model('Builder', builderSchema);