const Board = require('.')
const UserFindById = require('../../models/User/FindById')
const AddOneBoard = require('../../models/User/AddOneBoard')

const Create = async (title, backgroundURL, description, userId) => {
  console.log('userId')
  console.log(userId);
  const user = await UserFindById(userId);
  console.log('user')
  console.log(user);
  // Create and save the board
  const board = await Board({
    title,
    backgroundURL,
    description,
    activity: [{
      text: `${user.name} Criou este quadro`,
    }],
    members: [{ user: user.id, name: user.name }]
  }).save();

  await AddOneBoard(userId, board.id);

  return board
}

module.exports = Create