const Board = require('./Schema')

const FindManyById = (ids) => Board.find({ _id: { $in: { ids } } })

module.exports = FindManyById;