const Board = require('.')

const FindById = async (id) =>
await Board.findById(id).populate('lists').populate({
  path: 'members.user',
  select: '-password -boards'
})
  // .populate('members.user')

module.exports = FindById