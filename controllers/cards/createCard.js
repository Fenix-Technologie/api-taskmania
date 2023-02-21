const { validationResult } = require('express-validator');

const createCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, listId } = req.body;
    const boardId = req.header('boardId');

    // Create and save the card
    const newCard = new Card({ title });
    const card = await newCard.save();

    // Assign the card to the list
    const list = await List.findById(listId);
    list.cards.push(card.id);
    await list.save();

    // Log activity
    const user = await User.findById(req.user.id);
    const board = await Board.findById(boardId);
    board.activity.unshift({
      text: `${user.name} added '${title}' to '${list.title}'`,
    });
    await board.save();

    res.json({ cardId: card.id, listId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = createCard