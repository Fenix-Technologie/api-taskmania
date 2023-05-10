const List = require('../../models/List')

const getAllCards = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    const cards = [];
    for (const cardId of list.cards) {
      cards.push(await List.findById(cardId));
    }

    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getAllCards