const getAllBoardLists = async (req, res) => {
  try {
    const { boardId } = req.params
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado' });
    }

    const lists = [];
    for (const listId of board.lists) {
      lists.push(await List.findById(listId));
    }

    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}
module.exports = getAllBoardLists