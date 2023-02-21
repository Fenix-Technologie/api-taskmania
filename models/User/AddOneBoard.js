const User = require('./Schema')

const AddOneBoard = (id, boadId) => User.findOneAndUpdate({ _id: id }, { $push: { boards: boadId } })

module.exports = AddOneBoard