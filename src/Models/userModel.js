let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"],
        match: [/^\S+@\S+\.\S+$/, "Please use valid email"],
        trim: true,
        unique: true
    },
    userName: {
        type: String,
        required: [true, "UserName required"],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, "Password required"],
        trim: true,
        minlength: [4, "Password must be at least 4 characters"]

    },
    profileURL: {
        type: String,
    },
    fileId: {
        type: String,
    }


})

let userModel = mongoose.model("users", userSchema)
module.exports = userModel;