const UpdateBoardLists = require('../../models/Board/UpdateBoardLists')
const AddActivity = require('../../models/Board/AddActivity')

const updateboardLists = async (req, res) => {
  const { boardId, lists } = req.body
  try {
    const board = await UpdateBoardLists(boardId, lists)
    await AddActivity(boardId, { text: `Notify: ${req.user.name} moveu as listas de lugares` })

    res.status(200).json(board)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = updateboardLists