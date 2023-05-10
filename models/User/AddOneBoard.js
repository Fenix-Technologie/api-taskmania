const User = require('.')

const AddOneBoard = async (userId, boadId) => await User.findOneAndUpdate({ _id: userId }, { $push: { boards: boadId } })

module.exports = AddOneBoard