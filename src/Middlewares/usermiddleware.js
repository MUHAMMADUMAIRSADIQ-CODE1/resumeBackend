let jsonWebToken = require('jsonwebtoken')
const tokenBlackList = require('../Models/tokenBlacklistModel')
const userModel = require('../Models/userModel')


 async function userMiddleware(req, res, next) {
    let token = req.cookies.token
    if (!token) {
        return res.status(400).json({
            message: "Login Plz"
        })
    }
    let blacklist = await tokenBlackList.findOne({ token })
    if (blacklist) {
        return res.status(400).json({
            message: "Token Blacklisted"
        })
    }
    let decoded = await jsonWebToken.verify(token, process.env.JWT_KEY)
    if (!decoded) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
    req.user = decoded
  

    next()
}
module.exports={userMiddleware}