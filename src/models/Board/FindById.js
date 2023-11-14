const Board = require('.')

const FindById = async (id) =>
  await Board.findById(id).populate({
    path: 'members.user',
    select: '-password -boards'
  }).populate([
    {
      path: 'lists',
      populate: [{path: 'cards'}]
    }
  ])


module.exports = FindById