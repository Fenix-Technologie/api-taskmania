const Card = require('../../models/Card')
const User = require('../../models/User')
const AddActivity = require('../../models/Board/AddActivity')

const addAndRemoveCardMember = async (req, res) => {
  try {
    const { cardId, userId, add, boardId } = req.body;
    const card = await Card.findById(cardId);
    const user = await User.findById(userId).select('-password');

    if (!card || !user) {
      return res.status(404).json({ msg: 'Cartão/usuário não encontrado' });
    }

    const members = card.members.map((member) => member.user);
    const index = members.indexOf(userId);
    if ((add && members.includes(userId)) || (!add && index === -1)) {
      return res.json(card);
    }

    if (add) {
      card.members.push({ user: user.id, name: user.name });
    } else {
      card.members.splice(index, 1);
    }
    await card.save();

    // Log activity
    await AddActivity(boardId, { text: `Notify: ${user.name} ${add ? 'foi atribuido a' : 'foi desatruido da'} '${card.title}'` })

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
}

module.exports = addAndRemoveCardMember