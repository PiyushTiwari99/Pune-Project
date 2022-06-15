const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        requried: true,
        // Unique: true
    },
    password: {
        type: String,
        requried: true,
        //Unique: true
    },
    profileImage: {
        type: String,
        required: true
    },
    code: {
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model('UserData', userSchema)