let mongoose = require("mongoose");



let connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Db")
}
module.exports=connectDb;