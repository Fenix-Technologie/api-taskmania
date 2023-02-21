const User = require('./Schema')

const AddOneBoard = (userId, boadId) => User.findOneAndUpdate({ _id: userId }, { $push: { boards: boadId } })

module.exports = AddOneBoard