const BoardDelete = require('../../models/Board/DeleteBoard')

const deleteBoard = async (req, res) => {
  const { boardId } = req.body
  try {
    await BoardDelete(boardId)
    res.status(200).json()
  } catch (error) {
    res.status(500).send('Algo deu errado no servidor')
  }
}

module.exports = deleteBoard