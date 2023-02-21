const BoardFindById = require('../models/Board/FindById');

module.exports = async function (req, res, next) {
  const boardId = req.header('boardId')

  const board = await BoardFindById(boardId);
  if (!board) {
    return res.status(404).json({ msg: 'Quadro não encontrado' });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({ msg: 'Você deve ser um membro deste quadro para fazer alterações' });
  }
};
