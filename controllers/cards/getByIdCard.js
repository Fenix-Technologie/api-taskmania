const Card = require('../../models/Card')

const getByIdCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Cartão não encontrado' });
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getByIdCard