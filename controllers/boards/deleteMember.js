const DeleteMember = require('../../models/Board/DeleteMember')
const FindById = require('../../models/Board/FindById')
const AddActivity = require('../../models/Board/AddActivity')
const removeBoard = require('../../models/User/removeBoard')
const GetUserById = require('../../models/User/GetUserById')

const deleteMember = async (req, res) => {
    const { boardId, userId } = req.body 
    
    if (!boardId && !userId) {
        res.status(404).send('BoardId e usuário não encontrado')
    }

    try {
        const board = await FindById(boardId)

        const user = await GetUserById(userId)

        const arr = board.members.filter(member => member.user._id.valueOf() != userId)

        console.log(arr)
        
        await DeleteMember(boardId, arr)
        
        await removeBoard(boardId, userId)

        await AddActivity(boardId, {
            text: `Warning: ${user.name} foi removido deste quadro`,
          })

        res.status(200).send('Usuário removido com sucesso')
    } catch (err) {
        res.status(500).send('Erro, tente novamente')
    }
}

module.exports = deleteMember