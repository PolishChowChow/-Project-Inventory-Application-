const user = require("../models/user");
const LocalStrategy = require("passport-local")
exports.loginStrategy = new LocalStrategy(async(username, password, cb) => {
    const User = await user.find({username});
    if(User.length === 0){
        return cb(null, false, {message: "Incorrect username or password, try again"})
    }
    if(User[0].password !== password){
        return cb(null, false, {message: "Incorrect username or password, try again"})
    }
    return cb(null, User)
  })