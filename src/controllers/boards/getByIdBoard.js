const BoardFindManyById = require('../../models/Board/FindManyById')

const getByIdBoard = async (req, res) => {
  try {
    const board = await BoardFindManyById(req.userId);

    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado!' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getByIdBoard