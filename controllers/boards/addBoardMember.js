const GetUserByEmail = require('../../models/User/GetUserByEmail')
const UserAddOneBoard = require('../../models/User/AddOneBoard')
const AddNewMember = require('../../models/Board/AddNewMember')
const AddActivity = require('../../models/Board/AddActivity')
const FindById = require('../../models/Board/FindById')

const addBoardMember = async (req, res) => {
  try {
    const { boardId, email } = req.body
    const board = await FindById(boardId);
    const user = await GetUserByEmail(email);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    const existMember = board.members.find(member => member.user === user._id.valueOf());

    if (existMember) {
      return res.status(400).json({ msg: 'Já é um membro' });
    }
    await UserAddOneBoard(user._id, boardId);


    // Add user to board's members with 'normal' role
    const newMemberAdd = await AddNewMember(boardId, { user: user._id, name: user.name, role: 'normal' });

    // Log activity
    await AddActivity(boardId, {
      text: `Information: ${user.name} juntou-se a esta quadro`,
    });

    res.json(newMemberAdd.members[newMemberAdd.members.length - 1]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = addBoardMember;