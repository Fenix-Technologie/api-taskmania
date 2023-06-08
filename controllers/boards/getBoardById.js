const FindById = require('../../models/Board/FindById')

const getBoardById = async (req, res) => {
    const { params: { boardId } } = req
    console.log(req.params)
    console.log("Board ID: ", boardId)
  try {
    const board = await FindById(boardId);

    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado!' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getBoardById