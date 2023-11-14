const BoardFindById = require('../../models/Board/FindManyById')
const ListFindMany = require('../../models/List/FindManyList')

const getAllBoardLists = async (req, res) => {
  try {
    const { boardId } = req.params
    const board = await BoardFindById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado' });
    }

    const lists = await ListFindMany(board.lists)

    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}
module.exports = getAllBoardLists