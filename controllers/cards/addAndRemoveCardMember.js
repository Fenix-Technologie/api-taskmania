const addAndRemoveCardMember = async (req, res) => {
  try {
    const { cardId, userId } = req.params;
    const card = await Card.findById(cardId);
    const user = await User.findById(userId);
    if (!card || !user) {
      return res.status(404).json({ msg: 'Cartão/usuário não encontrado' });
    }

    const add = req.params.add === 'true';
    const members = card.members.map((member) => member.user);
    const index = members.indexOf(userId);
    if ((add && members.includes(userId)) || (!add && index === -1)) {
      return res.json(card);
    }

    if (add) {
      card.members.push({ user: user.id, name: user.name });
    } else {
      card.members.splice(index, 1);
    }
    await card.save();

    // Log activity
    const board = await Board.findById(req.header('boardId'));
    board.activity.unshift({
      text: `${user.name} ${add ? 'joined' : 'left'} '${card.title}'`,
    });
    await board.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = addAndRemoveCardMember