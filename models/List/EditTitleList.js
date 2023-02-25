const List = require('./Schema')

const ArchiveAndUnarchiveList = (id, title) => List.findOneAndUpdate({ _id: id }, {
  title
}, {
  returnDocument: 'after'
})


module.exports = ArchiveAndUnarchiveList