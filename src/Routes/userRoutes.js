const userController = require("../Controllers/registerauth.js");
const userMiddle = require("../Middlewares/usermiddleware.js");
let userModel = require("../Models/userModel.js");
let express = require("express");
const upload = require("../Middlewares/multer.js");

let router = express.Router();
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/getMe", userMiddle.userMiddleware, userController.getMe)
router.post('/image', upload.single('image'), userMiddle.userMiddleware, userController.image)
module.exports = router;