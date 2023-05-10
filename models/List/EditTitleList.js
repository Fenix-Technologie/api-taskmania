const List = require('.')

const ArchiveAndUnarchiveList = async (id, title) => await List.findOneAndUpdate({ _id: id }, {
  title
}, {
  returnDocument: 'after'
})


module.exports = ArchiveAndUnarchiveList