const ListFindMany = require('../../models/List/FindManyList')
const ListArchiveAndUnarchive = require('../../models/List/ArchiveAndUnarchiveList')
const UserFindById = require('../../models/User/FindById')
const BoardAddActivity = require('../../models/Board/AddActivity')

const archiveAndUnarchiveList = async (req, res) => {
  try {
    const { boardId, listId, userId, archive } = req.params
    const checkListExists = await ListFindMany.findById(listId);

    if (!checkListExists) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    const list = ListArchiveAndUnarchive(listId, archive)

    // Log activity
    const user = await UserFindById(userId);
    const text = list.archived
      ? `Warning: ${user.name} lista arquivada '${list.title}'`
      : `Warning: ${user.name} lista enviada '${list.title}' para o quadro`
    await BoardAddActivity(boardId, { text });

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = archiveAndUnarchiveList