const List = require('.')
const Card = require('../Card')
const Board = require('../Board')

const DeleteList = async (listId, boardId) => {

  const removeList = await List.findById(listId);

  const board = await Board.findById(boardId)

  const removeListOfBoard = board.lists.filter((list) => list !== listId)

  await Board.findByIdAndUpdate({ _id: boardId }, { $set: { lists: removeListOfBoard } })

  if (removeList.cards.length > 0) {
    removeList.cards.forEach(async (element) => {
      await Card.findByIdAndDelete(element)
    });
  }

  await List.findByIdAndDelete(listId)
  return 'ok'
}

module.exports = DeleteList