const Board = require('.')

const AddActivity = async (boardId, text) => {
  await Board.findByIdAndUpdate({ _id: boardId }, { $push: { activity: text } })
}

module.exports = AddActivity