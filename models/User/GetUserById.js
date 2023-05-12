const User = require(".");

const GetUserById = async (id) =>
  await User.findOne({ _id: id }).select("-password");


module.exports = GetUserById