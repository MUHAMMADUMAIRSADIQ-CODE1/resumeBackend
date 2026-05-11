let multer = require('multer')



let upload = multer({
    storage: multer.memoryStorage()
})
module.exports=upload;