const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,       // Nome da lista, requirido
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,  // Coleção de ids dos cards que compoem a lista naquele momento, referenciando a coleção de tasks
      ref: 'cards',
    },
  ],
  archived: {
    type: Boolean,
    required: true,     // Situação que se encontra a lista, se ela está arquivada ou ativa
    default: false,
  },
});

const List = model('List', ListSchema);

module.exports = List
