const { validationResult } = require("express-validator");
const EditTitleList = require('../../models/List/EditTitleList')
const AddActivity = require('../../models/Board/AddActivity')

const editListTitle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, listId, boardId } = req.body
    const list = await EditTitleList(listId, title);

    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    await AddActivity(boardId, { text: `Warning: ${req.user.name} renomeou a lista de "${list.title}" para "${title}"` })

    res.status(200).json(title);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = editListTitle