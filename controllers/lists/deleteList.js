const ListDelete = require('../../models/List/DeleteList')

const deleteList = async (req, res) => {
  const { listId } = req.body
  try {
    await ListDelete(listId)
    res.status(200).json()
  } catch (error) {
    res.status(500).send('Algo deu errado no servidor')
  }
}

module.exports = deleteList