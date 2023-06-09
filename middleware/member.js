const FindById = require("../models/Board/FindById");


module.exports = async function (req, res, next) {
  const { boardId } = req.body;
  const board = await FindById(boardId);
  if (!board) {
    return res.status(404).json({ msg: 'Quadro não encontrado' });
  }
  const members = board.members.map((member) => member.user);
  console.log(members);
  console.log(members.find((el) => el === req.user.id));
  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({ msg: 'Você deve ser um membro deste quadro para fazer alterações' });
  }
};
