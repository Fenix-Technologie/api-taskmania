const Board = require('.')

const FindById = async (id) =>
await Board.findById(id).populate('lists').populate({
  path: 'members.user',
  select: '-password -boards'
})


module.exports = FindById