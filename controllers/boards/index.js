const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check } = require('express-validator');

const createBoard = require('./createBoard')
const getUserBoards = require('./getUsersBoards')
const getByIdBoard = require('./getByIdBoard')
const getActivitysBoard = require('./getActivityBoard')
const changeBoardTitle = require('./changeBoardTitle')
const addBoardMember = require('./addBoardMember')

router.post(
  '/',
  auth,
  createBoard
);

router.get('/user', auth, getUserBoards);

router.get('/:id', auth, getByIdBoard);

router.get('/activity/board/:boardId', auth, getActivitysBoard);

router.patch(
  '/rename/board/:boardId/user/:userId',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  changeBoardTitle
);

router.patch('/board/:boardId/addMember/user/:userId', [auth, member], addBoardMember);

module.exports = router;
