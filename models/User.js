const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
