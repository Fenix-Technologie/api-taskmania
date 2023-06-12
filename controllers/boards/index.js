const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check } = require('express-validator');

const createBoard = require('./createBoard')
const getUserBoards = require('./getUserBoards')
const getByIdBoard = require('./getByIdBoard')
const getActivitysBoard = require('./getActivityBoard')
const changeBoardTitle = require('./changeBoardTitle')
const addBoardMember = require('./addBoardMember');
const getBoardById = require('./getBoardById');
const updateBoardLists = require('./updateBoardLists')
const deleteBoard = require('./deleteBoard')
const deleteMember = require('./deleteMember')
const ChageMemberRole = require('./ChangeMemberRole')

router.post(
  '/',
  auth,
  createBoard
);

router.get('/user', auth, getUserBoards);

router.get('/:id', auth, getByIdBoard);

router.get('/board/:boardId', getBoardById)

router.get('/activity/board/:boardId', auth, getActivitysBoard);

router.patch(
  '/rename/board',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  changeBoardTitle
);

router.patch('/board/addMember', [auth, member], addBoardMember);

router.put('/board/update/lists', [auth, member], updateBoardLists)

router.delete('/board/delete', [auth, member], deleteBoard)

router.patch('/board/member/remove', [auth, member], deleteMember)

router.patch('/board/member/role', [auth, member], ChageMemberRole)


module.exports = router;
