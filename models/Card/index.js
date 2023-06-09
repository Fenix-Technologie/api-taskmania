const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,     // Título da Task, requirido
    required: true,
  },
  description: {
    type: String, // Descrição opcional para a task
  },
  label: {
    type: String, // Informações a mais a qual queria a dicionar
  },
  members: [ // Array que condiz com os usuários que estão adicionados a esta tarefa
    {
      _id: false,
      user: {
        type: String,
        ref: 'users',                   // Id dos usuários referenciado a coleção de usuários
      },
      name: {
        type: String,
        required: true,    // nome do usuário
      },
    },
  ],
  checklist: [ // passos para serem cumpridos na tarefa
    {
      text: {
        type: String, // texto discritivo
      },
      complete: {
        type: Boolean, // completado ou não
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,    // Tarefa está arquivada ou não, sendo por padrão não estar arquivado
    default: false,
  },
});

const Card = model('Card', CardSchema);

module.exports = Card
