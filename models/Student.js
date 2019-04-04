const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const StudentSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
