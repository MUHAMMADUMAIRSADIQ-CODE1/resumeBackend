require("dotenv").config()
let app=require("./src/index.js");
let connectDb=require("./src/db/db.js");
connectDb()
app.listen("3000",()=>{
    console.log("port 3000 is running")
})