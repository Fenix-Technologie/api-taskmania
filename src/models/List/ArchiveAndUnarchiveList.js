const List = require('.')

const ArchiveAndUnarchiveList = async (id, archive) => await List.findOneAndUpdate({ _id: id }, {
  archive
}, {
  returnDocument: 'after'
})


module.exports = ArchiveAndUnarchiveList