const editCard = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, label } = req.body;

    if (title === '') {
      return res.status(400).json({ msg: 'Título é obrigatório' });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ msg: 'Cartão não encontrado' });
    }

    card.title = title ? title : card.title;
    if (description || description === '') {
      card.description = description;
    }
    if (label || label === 'none') {
      card.label = label;
    }
    await card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}
module.exports = editCard