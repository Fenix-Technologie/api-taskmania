const { Schema, model } = require('mongoose');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,         // Titulo dado ao Board para identificação, requirido
    },
    description: {
      type: String  // Descrição para o board, opcional
    },
    lists: [
      {
        type: String,
        ref: 'List',                 // Array de Id's de listas que fazem parte do board
      },
    ],
    activity: [ //Notificações de atividades criadas dentro do board
      {
        text: {
          type: String,   // texto da atividade
        },
        date: {
          type: Date,
          default: Date.now, // data de quando a atividade foi criada
        },
      },
    ],
    backgroundURL: {
      type: String, // Cor/Imagem de criação
    },
    members: [          // array de membros que fazem parte do board
      {
        _id: false,
        user: {
          type: String,        // Id dos usuários referenciando a coleção de usuários
          ref: 'User',
        },
        name: {
          type: String,
          required: true, // nome do usuário, requirido
        },
        role: {
          type: String,
          default: 'admin',   // criação por padrão do primeiro usuário do board, sendo assim o administrador
        },
      },
    ],
  },
  {
    timestamps: true, // Timestamp consiste na criatedAt e UpdatedAt 
  }
);

const Board = model('Board', BoardSchema);

module.exports = Board
