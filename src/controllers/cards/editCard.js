const Card = require('../../models/Card')

const editCard = async (req, res) => {
  try {
    const { cardId, title, description, deadline, priority, background } = req.body;

    if (title === '') {
      return res.status(400).json({ msg: 'Título é obrigatório' });
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ msg: 'Cartão não encontrado' });
    }

    card.title = title ? title : card.title;
    if (description || description === '') {
      card.description = description;
    }
    if (deadline) {
      card.deadline = deadline;
    }
    if (priority || priority === '') {
      card.priority = priority
    }
    if (background || background === '') {
      card.background = background
    }
    await card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}
module.exports = editCard