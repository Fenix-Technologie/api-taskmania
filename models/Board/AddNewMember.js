const Board = require('.')

const AddNewMember = async (boardId, newUser) => await Board.findByIdAndUpdate({ _id: boardId }, { $push: { members: newUser } }, { new: true }).populate({
  path: 'members.user',
  select: '-password -boards'
})

module.exports = AddNewMember