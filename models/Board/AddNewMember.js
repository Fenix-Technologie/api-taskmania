const Board = require('.')

const AddNewMember = async (boardId, newUser) =>  await Board.findOneAndUpdate({ _id: boardId }, { $push: { members: newUser } })

module.exports = AddNewMember