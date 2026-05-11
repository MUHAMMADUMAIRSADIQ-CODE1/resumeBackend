let ImageKit = require('imagekit')
var imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: 'https://ik.imagekit.io/obnf8ke4o'
})
async function uploadFile(req) {
    if (req.body?.fileId) {
        await imagekit.deleteFile(req.body.fileId);
    }
    let result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
    })
    return result
}
module.exports = uploadFile