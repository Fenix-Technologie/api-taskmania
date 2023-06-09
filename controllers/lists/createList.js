const User = require('../../models/User')
const Board = require('../../models/Board')
const List = require('../../models/List')

const { validationResult } = require("express-validator");

const createList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, boardId } = req.body;
    console.log(boardId);
    console.log(title);

    // Create and save the list
    const newList = new List({ title });
    
    const list = await newList.save();

    // Assign the list to the board
    const board = await Board.findById(boardId);
    board.lists.push(list.id);

    // Log activity
    const user = await User.findById(req.user.id);
    board.activity.unshift({
      text: `Warning: ${user.name} adicionado '${title}' para este quadro.`,
    });
    await board.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = createList