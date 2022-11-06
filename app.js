const passport = require("passport")
const bcrypt = require('bcrypt');
const express = require("express");

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const session = require("express-session")
const connectEnsureLogin = require("connect-ensure-login")
const userModel = require("./models/users")
require("dotenv").config()
const {databaseConnection} = require("./db")
const PORT = process.env.PORT
const path = require("path")
const app = express()
// connectToMongoDb()
databaseConnection()



const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');
const { application } = require("express");



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 100}
}))

// the app uses these routes
app.use(express.json())
app.use('/signup',authRoute)
app.use("/login",authRoute)
app.use('/compose',postRoute);
app.use("/",authRoute)
app.use("/logout",authRoute)

app.listen(PORT, ()=>{
    console.log(`Server Listening at Port:${PORT}`)
})

