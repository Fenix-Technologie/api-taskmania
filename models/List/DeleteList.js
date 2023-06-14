const List = require('.')
const Card = require('../Card')

const DeleteList = async (listId) => {

  const removeList = await List.findById(listId);

  if (removeList.length < 0) {
    removeList.cards.forEach(async (element) => {
      await Card.findByIdAndDelete(element)
    });
  }

  await List.findByIdAndDelete({ _id: listId })

  return
}

module.exports = DeleteList