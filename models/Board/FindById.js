const Board = require('./Schema')

const FindById = (id) => Board.findById(id)

module.exports = FindById