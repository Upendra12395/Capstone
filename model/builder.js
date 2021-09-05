const mongoose = require('mongoose')

const builderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    certificateNo: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Builder', builderSchema);