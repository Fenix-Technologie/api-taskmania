const Card = require('../../models/Card')
const User = require('../../models/User')
const Board = require('../../models/Board')

const archiveAndUnarchiveCard = async (req, res) => {
  try {
    const { boardId, userId, archive, cardId } = req.params

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ msg: 'Cartão não encontrado' });
    }

    card.archived = archive === 'true';
    await card.save();

    // Log activity
    const user = await User.findById(userId);
    const board = await Board.findById(boardId);
    board.activity.unshift({
      text: card.archived
        ? `${user.name} cartão arquivado '${card.title}'`
        : `${user.name} cartão enviado '${card.title}' para o quadro`,
    });
    await board.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = archiveAndUnarchiveCard