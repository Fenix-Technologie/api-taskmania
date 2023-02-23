const archiveAndUnarchiveList = async (req, res) => {
  try {
    const { boardId, listId, userId } = req.params
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    list.archived = req.params.archive === 'true';
    await list.save();

    // Log activity
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    board.activity.unshift({
      text: list.archived
        ? `${user.name} lista arquivada '${list.title}'`
        : `${user.name} lista enviada '${list.title}' para o quadro`,
    });
    await board.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = archiveAndUnarchiveList