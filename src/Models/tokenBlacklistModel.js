let mongoose = require("mongoose");
let tokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }

}, { timestamps: true })
let tokenBlackList = mongoose.model("BlackListToken", tokenBlackListSchema)
module.exports = tokenBlackList


