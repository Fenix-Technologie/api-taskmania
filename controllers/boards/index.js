const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const create = require('./create')
const getUserBoards = require('./getUsersBoards')
const getById = require('./getById')
const getActivitys = require('./getActivity')
const changeBoardTitle = require('./changeBoardTitle')
const addBoardMember = require('./addBoardMember')

router.post(
  '/',
  [auth, [check('title', 'O título é obrigatório').not().isEmpty()]],
  create
);

router.get('/user/:id', auth, getUserBoards);

router.get('/:id', auth, getById);

router.get('/activity/board/:boardId', auth, getActivitys);

router.patch(
  '/rename/board/:boardId/user/:userId',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  changeBoardTitle
);

router.patch('/board/:boardId/addMember/user/:userId', [auth, member], addBoardMember);

module.exports = router;
