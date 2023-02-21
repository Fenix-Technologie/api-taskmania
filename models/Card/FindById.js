const Card = require('./Schema')

const FindById = (id) => Card.findById(id)

module.exports = FindById