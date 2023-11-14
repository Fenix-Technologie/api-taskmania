const ListFindManyList = require('../../models/List/FindManyList')

const getListById = async (req, res) => {
  try {
    const { listId } = req.params
    const list = await ListFindManyList(listId);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}
module.exports = getListById