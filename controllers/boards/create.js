const UserFindById = require('../../models/User/FindById')

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, backgroundURL } = req.body;

    // Create and save the board
    const newBoard = new Board({ title, backgroundURL });
    const board = await newBoard.save();

    // Add board to user's boards
    const user = await UserFindById(req.user.id);
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members as admin
    board.members.push({ user: user.id, name: user.name });

    // Log activity
    board.activity.unshift({
      text: `${user.name} Criou este quadro`,
    });
    await board.save();

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = create