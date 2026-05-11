let express = require("express");
let router = express.Router();
const resumeController = require('../Controllers/resumeController.js')
const upload = require("../Middlewares/multer.js");
const { userMiddleware } = require("../Middlewares/usermiddleware.js");



router.post('/resume', userMiddleware, upload.single('resume'), resumeController.resumeAI)
router.post("/convert", upload.single("file"), resumeController.pdftoIMg)
module.exports = router