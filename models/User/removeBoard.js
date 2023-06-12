const User = require('.')

const removeBoard = async (boardId, userID) => {
    const userBoard = await User.findById({
        _id: userID,
    })

    const boards = userBoard.boards.filter(board => board != boardId)

    console.log(boards)

    await User.findByIdAndUpdate({
        _id: userID
    }, {
        $set: {
            boards: boards.length > 0 ? boards : []
        }
    })
}

module.exports = removeBoard