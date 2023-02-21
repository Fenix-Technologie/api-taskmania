const BoardFindById = require('../../models/Board/FindById')

const getActivitysBoard = async (req, res) => {
  try {
    const { boardId } = req.params
    const board = await BoardFindById(boardId);

    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado!' });
    }

    res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getActivitysBoard