const Card = require('../../models/Card')
const User = require('../../models/User')
const Board = require('../../models/Board')
const List = require('../../models/List')
const AddActivity = require('../../models/Board/AddActivity')

const deleteCard = async (req, res) => {
  try {
    const { userId, boardId, listId, cardId } = req.params

    const card = await Card.findById(cardId);
    const list = await List.findById(listId);

    if (!card || !list) {
      return res.status(404).json({ msg: 'Lista/Cartão não encontrado' });
    }

    list.cards.splice(list.cards.indexOf(listId), 1);

    await list.save();

    await card.remove();

    // Log activity
    const user = await User.findById(userId);

    await AddActivity(boardId, {
      text: `Warning: ${user.name} excluído '${card.title}' de '${list.title}'`,
    });

    res.status(200).send('Task removida');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = deleteCard