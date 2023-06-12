const ChangeMemberRole = require('../../models/Board/ChangeMemberRole')
const Board = require('../../models/Board')
const AddActivity = require('../../models/Board/AddActivity')
const GetUserById = require('../../models/User/GetUserById')

const changeMemberRole = async (req, res) => {
    const { boardId, userId, role } = req.body 
    
    if (!boardId && !userId) {
        res.status(404).send('BoardId e usuário não encontrado')
    }

    try {
        const board = await Board.findById({
            _id: boardId
        })

        const user = await GetUserById(userId)

        // console.log("Body: ", boardId, userId, role)
         console.log("Board: ", board)

        const arr = board.members.map(member => {
            if (member.user === userId) {
                return {
                    ...member, 
                    role: role
                }
            }

            return {...member}
            
        })

        console.log("Array: ",arr)
        
        await ChangeMemberRole(boardId, arr)

        await AddActivity(boardId, {
            text: `Warning: ${user.name} foi promovido a ${role} deste quadro`,
          })

        res.status(200).send('Usuário promovido com sucesso')
    } catch (err) {
        res.status(500).send('Erro, tente novamente')
    }
}

module.exports = changeMemberRole