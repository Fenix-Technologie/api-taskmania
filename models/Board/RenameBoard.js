const Board = require('./Schema')

const RenameBoard = (boardId, title) => Board.findOneAndUpdate({ _id: boardId }, { title })

module.exports = RenameBoard