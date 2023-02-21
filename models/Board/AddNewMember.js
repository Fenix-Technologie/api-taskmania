const Board = require('./Schema')

const AddNewMember = (boardId, newUser) => Board.findOneAndUpdate({ _id: boardId }, { $push: { members: newUser } })

module.exports = AddNewMember