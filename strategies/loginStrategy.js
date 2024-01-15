const user = require("../models/user");
const LocalStrategy = require("passport-local")
exports.loginStrategy = new LocalStrategy(async(username, password, cb) => {
    const User = await user.find({username});
    console.log(User)
    if(User.length === 0){
        console.log("failed on query")
        return cb(null, false, {message: "Incorrect username or password, try again"})
    }
    if(User[0].password !== password){
        console.log("failed on password")
        return cb(null, false, {message: "Incorrect username or password, try again"})
    }
    return cb(null, User)
  })