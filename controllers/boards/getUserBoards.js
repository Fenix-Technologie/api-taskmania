const UserFindById = require('../../models/User/FindById')
const BoardsFindManyById = require('../../models/Board/FindManyById')

const getUserBoards = async (req, res) => {
  try {
    const user = await UserFindById(req.userId);

    const boards = await BoardsFindManyById(user.boards);

    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getUserBoards