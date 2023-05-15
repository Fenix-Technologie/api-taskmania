const Card = require('../../models/Card')
const User = require('../../models/User')
const Board = require('../../models/Board')
const List = require('../../models/List')

const moveCard = async (req, res) => {
  try {
    const { cardId, boardId } = req.params;
    const { fromId, toId, toIndex } = req.body;

    const from = await List.findById(fromId);
    let to = await List.findById(toId);
    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: 'Lista/Cartão não encontrado' });
    } else if (fromId === toId) {
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cards.splice(toIndex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }

    // Log activity
    if (fromId !== toId) {
      const user = await User.findById(req.user.id);
      const board = await Board.findById(boardId);
      const card = await Card.findById(cardId);
      board.activity.unshift({
        text: `information: ${user.name} movido '${card.title}' de '${from.title}' para '${to.title}'`,
      });
      await board.save();
    }

    res.send({ cardId, from, to });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = moveCard
