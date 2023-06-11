const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,     // Título da Task, requirido
    required: true,
  },
  description: {
    type: String, // Descrição opcional para a task
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
  deadline: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true, // Timestamp consiste na criatedAt e UpdatedAt 
  },
);

const Card = model('Card', CardSchema);

module.exports = Card
