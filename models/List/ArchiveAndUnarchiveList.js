const List = require('./Schema')

const ArchiveAndUnarchiveList = (id, archive) => List.findOneAndUpdate({ _id: id }, {
  archive
}, {
  returnDocument: 'after'
})


module.exports = ArchiveAndUnarchiveList