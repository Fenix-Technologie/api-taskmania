const BoardFindManyById = require('../../models/Board/FindManyById')
const BoardAddActivity = require('../../models/Board/AddActivity')
const BoardRenameBoard = require('../../models/Board/RenameBoard')
const UserFindById = require('../../models/User/FindById')
const { validationResult } = require('express-validator')

const changeBoardTitle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { boardId, userId } = req.params
    const { title } = req.body
    let board = await BoardFindManyById(boardId);
    const user = await UserFindById(userId);

    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado' });
    }

    // Log activity
    if (title !== board.title) {
      BoardAddActivity(boardId, {
        text: `${user.name} quadro renomeado (de '${board.title}' para  '${title}')`,
      });
    }

    board = await BoardRenameBoard(boardId, title);

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = changeBoardTitle;