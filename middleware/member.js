const FindById = require("../models/Board/FindById");


module.exports = async function (req, res, next) {
  const { boardId } = req.body;
  const board = await FindById(boardId);
  if (!board) {
    return res.status(404).json({ msg: 'Quadro não encontrado' });
  }
  const membersID = board.members.map((member) => member.user._id.valueOf());
   if (membersID.includes(req.user.id)) {
     next();
   } else {
     res.status(401).json({ msg: 'Você deve ser um membro deste quadro para fazer alterações' });
   }
};
