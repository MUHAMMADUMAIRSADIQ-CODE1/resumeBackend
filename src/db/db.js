let mongoose = require("mongoose");



let connectDb = async () => {
    mongoose.connect(process.env.Mongoose_Key)
    console.log("Connected to Db")
}
module.exports=connectDb;