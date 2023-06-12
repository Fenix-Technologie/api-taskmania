const Board = require('.')

const DeleteMember = async (id, arr) => {
    await Board.findByIdAndUpdate({
        _id: id,

    }, {
        $set: {
            members: arr
        }
    })
}

module.exports = DeleteMember