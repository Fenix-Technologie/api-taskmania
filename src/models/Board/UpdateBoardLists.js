const Board = require('.');

const UpdateBoardLists = async (boardId, lists) => {
  const changedLists = await Board.findByIdAndUpdate({ _id: boardId }, {
    $set: {
      lists
    }
  }, {
    returnDocument: 'after'
  })
  return changedLists
}

module.exports = UpdateBoardLists