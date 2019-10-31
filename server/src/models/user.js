const mongoose = require("mongoose");
const bcrypt     = require('bcryptjs');

const User = new mongoose.Schema({
    username: {type: String, required: [true, "Please enter your username!"] },
    email: {
        type: String, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!'],
        required: [true, "Please enter your email!"]
    },
    password: {type: String, required: [true, "Please enter a password!"]},
    firstname: {type: String, required: [true, "Please enter your first name!"]},
    lastname: {type: String, required: [true, "Please enter your last name!"]},
    cocktails: [String]
},
{
    timestamps: true
});


module.exports = mongoose.model('user', User);