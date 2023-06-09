const Board = require('.')

const FindById = async (id) =>
  await Board.findById(id).populate('lists')
  // .populate('members.user')

module.exports = FindById