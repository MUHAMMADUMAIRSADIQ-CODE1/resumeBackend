const userModel = require("../Models/userModel");
let bcrypt = require("bcrypt");
let jsonwebtoken = require("jsonwebtoken")
let tokenBlackList = require("../Models/tokenBlacklistModel.js");
const uploadFile = require("../services/imgKit.js");


async function register(req, res) {
    console.log(req.body)
    const { email, password, userName, profileURL = '' } = req.body
    try {
        if (!email || !password || !userName) return res.status(400).json({ message: "Email UserName or password is required" });
        if (userName.length < 5) {
            return res.status(400).json({ message: "UserName must be at least 5 characters" });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters" });
        }
        let hashPass = await bcrypt.hash(password, 10)
        let user = await userModel.create({ email, password: hashPass, userName, profileURL })
        let token = jsonwebtoken.sign({
            id: user._id,
        }, process.env.JWT_KEY, { expiresIn: "1d" })
        console.log(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(201).json({
            message: `${userName} Singnup sucessfully`,
            user
        })
    }
    catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]

            return res.status(409).json({
                message: `${field} already exists`
            })
        } if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            })
        } return res.status(500).json({
            message: "Server error"
        })
    }
}
async function login(req, res) {
    let { email, password, userName } = req.body
    if (!password || (!email && !userName)) {
        return res.json({
            message: "invalid"
        })
    }
    let user = await userModel.findOne({
        $or: [{ userName }, { email }]
    })
    if (!user) {
        return res.status(400).json({
            message: "invalid email or userName"
        })
    }
    console.log(user)
    let verify = await bcrypt.compare(password, user.password)
    if (!verify) {
        return res.status(400).json({
            message: "invalid Password"
        })
    }

    let token = jsonwebtoken.sign({
        id: user._id
    }, process.env.JWT_KEY)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    })
    res.json({
        message: `${user.userName} login sucessfully`,
        user
    })
}
async function logout(req, res) {
    let token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "Token required"
        })
    }
    tokenBlackList.create({ token })
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.status(201).json({
        message: "Logout sucessfully"
    })
}
async function getMe(req, res) {
    console.log('get me')
    let decoded = req.user
    let user = await userModel.findById(decoded.id)
    res.status(201).json({
        message: "Searched Sucessfully",
        user
    })
}

async function image(req, res) {
    console.log('agaya ')
    console.log(req.file)
    console.log(req.body.fileId)
    try {
        let result = await uploadFile(req)
        let profileURL = result.url
        let fileId = result.fileId
        console.log(profileURL)
        if (!profileURL) {
            return res.status(400).json({
                message: "Upload failed"
            })
        }
        let user = await userModel.findByIdAndUpdate(req?.user?.id, { profileURL, fileId }, { new: true })
        console.log(user)
        res.status(201).json({
            message: "Image Saved Sucessfully",
            user
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { register, login, logout, getMe, image }