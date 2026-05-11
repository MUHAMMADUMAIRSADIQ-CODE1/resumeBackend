const sharp = require("sharp");
let pngConverter = async (buffer) => {
    let pngConverterBuffer = await sharp(buffer).png().toBuffer()
    return pngConverterBuffer
}
module.exports=pngConverter