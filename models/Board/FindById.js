const Board = require('.')

const FindById = async (id) => await Board.findById(id).populate('list')

module.exports = FindById