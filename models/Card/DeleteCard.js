const Card = require('.')

const DeleteCard = async (cardId) => {
  await Card.findByIdAndDelete({ _id: cardId })
  return
}

module.exports = DeleteCard