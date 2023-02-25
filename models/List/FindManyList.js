const List = require('./ Schema')

const FindManyList = (id) => List.find({
  _id: {
    $in: { id }
  }
})

module.exports = FindManyList