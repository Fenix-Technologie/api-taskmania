const List = require('.')

const FindManyList = async (id) =>  await List.find({
  _id: {
    $in: { id }
  }
})

module.exports = FindManyList