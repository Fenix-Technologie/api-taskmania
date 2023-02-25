const User = require("./Schema");

const FindById = (id) => User.findById(id).select("-password");

module.exports = FindById
