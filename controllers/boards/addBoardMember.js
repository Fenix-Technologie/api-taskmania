const BoardFindManyById = require('../../models/Board/FindManyById')
const UserFindById = require('../../models/User/FindById')
const UserAddOneBoard = require('../../models/User/AddOneBoard')
const AddNewMember = require('../../models/Board/AddNewMember')
const AddActivity = require('../../models/Board/AddActivity')

const addBoardMember = async (req, res) => {
  try {
    const { boardId, userId } = req.params
    let board = await BoardFindManyById(boardId);
    const user = await UserFindById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    if (board.members.map((member) => member.user).includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Já é um membro' });
    }

    await UserAddOneBoard(userId, boardId);

    // Add user to board's members with 'normal' role
    board = await AddNewMember(board, { user: user.id, name: user.name, role: 'normal' });

    // Log activity
    await AddActivity(boardId, {
      text: `${user.name} juntou-se a esta quadro`,
    });

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = addBoardMember;