const Board = require('.')

const FindById = async (id) => await Board.findById(id)

module.exports = FindById