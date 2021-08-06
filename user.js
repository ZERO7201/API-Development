// SCHEMA is the base structure of a data
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // key: dataType
    name: String,
    email: String,
    phno: Number,
    userType: String,
});

// "User" is a Collection(just like table in MySQL)
const userModel =  mongoose.model("User", userSchema);

module.exports = userModel;