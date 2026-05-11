const Tesseract = require("tesseract.js");
const pngConverter = require("./pngConverter");
let tesseractImage = async (buffer) => {
    try{
        let cleanedBuffer=await pngConverter(buffer)
        const { data: { text } } = await Tesseract.recognize(
        cleanedBuffer,
        "eng"
    );
    if (!(text)) {
        throw new Error("No text extracted from file");
    }
    return text
    }
    catch(err){
        throw new Error("Image parsing failed: " + err.message);
    }
}
module.exports = tesseractImage