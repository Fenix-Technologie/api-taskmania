const { validationResult } = require("express-validator");
const EditTitleList = require('../../models/List/EditTitleList')

const editListTitle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { listId } = req.params
    const { title } = req.body
    const list = await EditTitleList(listId, title);

    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = editListTitle