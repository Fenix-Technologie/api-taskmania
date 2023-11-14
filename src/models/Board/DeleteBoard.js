const Board = require('.')

const DeleteBoard = async (boardId) => {
  await Board.findByIdAndDelete({ _id: boardId })
  return
}

module.exports = DeleteBoard