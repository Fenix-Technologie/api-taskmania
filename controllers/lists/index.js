const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check } = require('express-validator');

const createList = require('./createList')
const getAllBoardLists = require('./getAllBoardLists');

const archiveAndUnarchiveList = require('./archiveAndUnarchiveList');
const getListById = require('./getListById');
const editListTitle = require('./editListTitle');
const deleteList = require('./deleteList')

// Add a list
router.post(
  '/',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  createList
);

// Get all of a board's lists
router.get('/boardLists/:boardId', auth, getAllBoardLists);

// Get a list by id
router.get('/:listId', auth, getListById);

// Edit a list's title
router.patch(
  '/rename/:listId',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  editListTitle
);

// Archive/Unarchive a list
router.patch('/board/:boardId/archive/:archive/list/:listId/user/:userId', [auth, member], archiveAndUnarchiveList);

router.delete('/list', [auth, member], deleteList)

module.exports = router;
