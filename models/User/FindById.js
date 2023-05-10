const User = require(".");

const FindById = async (id) => await User.findById(id).select("-password");

module.exports = FindById
