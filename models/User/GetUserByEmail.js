const User = require("./Schema");

const FindOneUserByEmail = (email) =>
  User.findOne({ email }).select("-password");


  module.exports = FindOneUserByEmail