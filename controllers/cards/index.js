const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check } = require('express-validator');

const createCard = require('./createCard')
const getAllCard = require('./getAllCards')
const getByIdCard = require('./getByIdCard')
const editCard = require('./editCard')
const archiveAndUnarchiveCard = require('./archiveAndUnarchiveCard')
const moveCard = require('./moveCard')
const addAndRemoveCardMember = require('./addAndRemoveCardMember')
const deleteCard = require('./deleteCard')

router.post(
  '/',
  [auth, member, [check('title', 'Título é Obrigatorio').not().isEmpty()]],
  createCard
);

router.get('/listCards/:listId', auth, getAllCard);

router.get('/:id', auth, getByIdCard);

router.patch('/edit/card/', [auth, member], editCard);

router.patch('/board/:boardId/user/:userId/archive/:archive/card/:cardId', [auth, member], archiveAndUnarchiveCard);

router.patch('/board/:boardId/move/card/:cardId', [auth, member], moveCard);

router.put('/addMember/card/user/', [auth, member], addAndRemoveCardMember);

router.delete('/card/remove/user/:userId/board/:boardId/list/:listId/card/:cardId', [auth, member], deleteCard);

module.exports = router;
