const List = require('.')

const DeleteList = async (listId) => {
  await List.findByIdAndDelete({ _id: listId })
  return
}

module.exports = DeleteList