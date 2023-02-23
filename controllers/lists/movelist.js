const moveList = async (req, res) => {
  try {
    const { listId, boardId } = req.params;
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const board = await Board.findById(boardId);
    if (!listId) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    res.send(board.lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = moveList