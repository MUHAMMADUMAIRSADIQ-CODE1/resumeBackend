require("dotenv").config();

let app = require("./src/index.js");
let connectDb = require("./src/db/db.js");

connectDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`port ${PORT} is running`);
});