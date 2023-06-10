const EditTitleList = require('../../models/List/EditTitleList')
const AddActivity = require('../../models/Board/AddActivity')

const editListTitle = async (req, res) => {
  const { newTitle, listId, boardId } = req.body
  
  if (!newTitle) {
    return res.status(400).json({ msg: 'Informe o título da lista' });
  }

  try {
    const list = await EditTitleList(listId, newTitle);

    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    await AddActivity(boardId, { text: `Warning: ${req.user.name} renomeou a lista de "${list.title}" para "${newTitle}"` })

    res.status(200).json(newTitle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = editListTitle