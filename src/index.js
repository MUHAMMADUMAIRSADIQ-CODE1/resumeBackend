const CookieParser = require("cookie-parser");
let express = require("express")
let cors = require("cors")
let userRoutes = require("./Routes/userRoutes.js")
let resumeRoutes = require('./Routes/resumeRoutes.js')
let app = express();
app.use(express.json())
app.use(cors({
    origin: 'https://resumeaium.netlify.app',
    credentials: true
}))
app.use(CookieParser())
app.use("/auth", userRoutes)
app.use('/api', resumeRoutes)
module.exports = app;