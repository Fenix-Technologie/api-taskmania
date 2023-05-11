const { validationResult } = require('express-validator');
const Create = require('../../models/Board/Create')

const createBoard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, backgroundURL, description, userId } = req.body;

    const board = await Create(title, backgroundURL, userId, description)

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = createBoard