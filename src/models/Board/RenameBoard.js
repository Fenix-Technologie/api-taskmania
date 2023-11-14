const Board = require('.')

const RenameBoard = async (boardId, title) => await Board.findOneAndUpdate({ _id: boardId }, { title })

module.exports = RenameBoard