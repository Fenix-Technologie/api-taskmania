const List = require('.')

const ArchiveAndUnarchiveList = async (id, title) => await List.findByIdAndUpdate({ _id: id }, {
  title
}, {
  returnDocument: 'after'
})


module.exports = ArchiveAndUnarchiveList