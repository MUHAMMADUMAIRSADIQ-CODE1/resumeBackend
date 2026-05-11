const Groq = require('groq-sdk')
const pdfParseFunc = require('../services/pdfparse');
const tesseractImage = require('../services/tesseract-img');
const resumeAnalyzePrompt = require('../services/resumePrompt/groqPromptResumeAnalysis');
const groqConfig = require('../services/groqConfig');
let resumeAI = async (req, res) => {
  try {
    let textpdfimg;
    if (req.file.mimetype.startsWith("image/")) {
      textpdfimg = await tesseractImage(req.file.buffer)
    }
    if (req.file.mimetype === 'application/pdf') {
      textpdfimg = await pdfParseFunc(req.file.buffer)
    }
    console.log(textpdfimg)
    let resAI = await groqConfig(textpdfimg)
    res.status(201).json({
      message: "Analyze Resume Sucessfully",
      resAI
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}


module.exports = { resumeAI }