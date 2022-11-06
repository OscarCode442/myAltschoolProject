const mongoose = require("mongoose")

function databaseConnection(){
    mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
.then(console.log("Database Connected Succefully"))
.catch((err)=>{
    console.log(err)
})

}

module.exports = {databaseConnection}