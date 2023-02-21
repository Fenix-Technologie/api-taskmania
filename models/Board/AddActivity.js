const Board = require('./Schema')

const AddActivity = (boardId, text) => Board.findOneAndUpdate({ _id: boardId }, { $push: { activity: text } })

module.exports = AddActivity