const Groq = require('groq-sdk');
const resumeAnalyzePrompt = require('./resumePrompt/groqPromptResumeAnalysis');
const { jsonrepair } = require("jsonrepair");
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
let groqConfig = async (text) => {
    const chatCompletion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: resumeAnalyzePrompt
            },
            {
                role: "user",
                content: JSON.stringify(text)
            }
        ],response_format: { type: "json_object" } 
    });
    let raw = chatCompletion.choices[0].message.content;
    let cleaned = jsonrepair(raw);
    let parsed = JSON.parse(cleaned);
    return parsed
}
module.exports = groqConfig