const User = require('.')

const AddOneBoard = async (userId, boadId) => await User.findByIdAndUpdate({ _id: userId }, { $push: { boards: boadId } })

module.exports = AddOneBoard