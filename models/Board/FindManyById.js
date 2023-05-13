const Board = require('.')

const FindManyById = async (ids) => {
  const boards = await Board.find({ '_id': { $in: ids } })

  return boards
}


module.exports = FindManyById;