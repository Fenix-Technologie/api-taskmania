const Board = require('.')

const FindManyById = async (ids) => await Board.find({ _id: { $in: { ids } } })

module.exports = FindManyById;