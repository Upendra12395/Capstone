const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true
    }

})

module.exports = mongoose.model('Owner', ownerSchema);