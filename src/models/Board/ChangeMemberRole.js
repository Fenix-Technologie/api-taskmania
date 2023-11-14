const Board = require('.')

const ChangeMemberRole = async (id, arr) => {
    await Board.findByIdAndUpdate({
        _id: id,

    }, {
        $set: {
            members: arr
        }
    })
}

module.exports = ChangeMemberRole