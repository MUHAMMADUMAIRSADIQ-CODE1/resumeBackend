let ImageKit = require('imagekit')
var imagekit = new ImageKit({
    privateKey: process.env.private_api_key,
    publicKey: process.env.public_api_key,
    urlEndpoint: 'https://ik.imagekit.io/obnf8ke4o'
})
async function uploadFile(req) {
    await imagekit.deleteFile(req.body.fileId)
    let result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
    })
    return result
}
module.exports = uploadFile