const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 40,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    axLength: 40,
    minLength: 5,
  },
  dateOfCreation: {
    type: String,
    required: true,
    default: Date().toLocaleLowerCase()
  }
});
const user =  mongoose.model("User", UserSchema);
module.exports = user
