const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,        // Nome dado ao usuário, requirido
    required: true,
  },
  email: {
    type: String,
    required: true, // Email do usuário, requirido e deve ser único
    unique: true,
  },
  password: {
    type: String,
    required: true, // Senha do usuário, guardado em formato de hash, requirido
  },
  avatar: {
    type: String, // Uma imagem que o usuário se identifica
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'boards',                    // Coleção de id's dos boards a qual o usuário faz parte
    },
  ],
});

const User = model('User', UserSchema)


module.exports = User;
