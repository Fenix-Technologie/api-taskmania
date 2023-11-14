const User = require(".");

const FindOneUserByEmail = async (email) =>
  await User.findOne({ email }).select("-password");


  module.exports = FindOneUserByEmail