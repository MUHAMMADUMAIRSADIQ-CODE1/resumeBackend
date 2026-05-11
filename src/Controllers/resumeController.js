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
const fs = require("fs");
const path = require("path");
const { convert } = require("pdf-poppler");

const pdftoIMg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    // temp file banayo
    const tempPdfPath = path.join(__dirname, "temp.pdf");
    fs.writeFileSync(tempPdfPath, req.file.buffer);

    // convert PDF → PNG
    await convert(tempPdfPath, {
      format: "png",
      out_dir: __dirname,
      out_prefix: "output",
      page: 1,
    });

    const imagePath = path.join(__dirname, "output-1.png");

    // image buffer read karo
    const imgBuffer = fs.readFileSync(imagePath);

    // response send
    res.setHeader("Content-Type", "image/png");
    res.send(imgBuffer);

    // cleanup
    setTimeout(() => {
      try {
        fs.unlinkSync(tempPdfPath);
        fs.unlinkSync(imagePath);
      } catch (e) {}
    }, 2000);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Conversion error",
      error: error.message,
    });
  }
};


module.exports = { resumeAI,pdftoIMg }