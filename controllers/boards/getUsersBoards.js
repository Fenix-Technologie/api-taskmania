const UserFindById = require('../../models/User/FindById')
const BoardsFindManyById = require('../../models/Board/FindManyById')

const getUserBoards = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserFindById(id);

    const boards =  await BoardsFindManyById(user.boards._id);

    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = getUserBoards