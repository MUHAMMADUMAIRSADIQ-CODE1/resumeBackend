let pdf = require('pdf-parse')
let pdfParseFunc = async (buffer) => {
    try{
        const data = await pdf(buffer);
    if (!(data?.text)) {
        throw new Error("No text extracted from file");
    }
    return data?.text
    }
    catch(err){
        throw new Error("PDF parsing failed: " + error.message);
    }
}
module.exports = pdfParseFunc