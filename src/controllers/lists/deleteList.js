const ListDelete = require('../../models/List/DeleteList')
const AddActivity = require('../../models/Board/AddActivity')

const deleteList = async (req, res) => {
  const { listId, boardId } = req.params
  try {

    const respo = await ListDelete(listId, boardId)

    console.log(respo);

    await AddActivity(boardId, {
      text: `Warning: A lista foi excluída pelo ${req.user.name}`
    })

    res.status(200).send('Lista excluida com sucesso')
  } catch (error) {
    res.status(500).send('Algo deu errado no servidor', error)
  }
}

module.exports = deleteList