const Board = require('.')

const AddNewMember = async (boardId, newUser) => await Board.findByIdAndUpdate({ _id: boardId }, { $push: { members: newUser } }, {
  returnDocument: 'after'
}).populate({
  path: 'members.user',
  select: '-password -boards'
})

module.exports = AddNewMember