const Card = require('./Schema')

const FindById = async (id) => await Card.findById(id)

module.exports = FindById