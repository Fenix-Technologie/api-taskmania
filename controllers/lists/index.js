const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const member = require('../../../middleware/member');
const { check, validationResult } = require('express-validator');

const createList = require('./createList')
const moveList = require('./movelist');
const getAllBoardLists = require('./getAllBoardLists');

const List = require('../../../models/List');
const archiveAndUnarchiveList = require('./archiveAndUnarchiveList');

// Add a list
router.post(
  '/',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  createList
);

// Get all of a board's lists
router.get('/boardLists/:boardId', auth, getAllBoardLists);

// Get a list by id
router.get('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Edit a list's title
router.patch(
  '/rename/:id',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ msg: 'Lista não encontrada' });
      }

      list.title = req.body.title;
      await list.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// Archive/Unarchive a list
router.patch('/board/:boardId/archive/:archive/list/:listId/user/:userId', [auth, member], archiveAndUnarchiveList);

// Move a list
router.patch('/board/:boardId/move/list/:listid', [auth, member], moveList);

module.exports = router;
