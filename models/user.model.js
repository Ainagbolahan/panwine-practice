const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    username: String,
    password: String,
    phone: String,
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
