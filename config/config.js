const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Banco de Dados MongoDB Connectado...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
  console.log("Conectado");
};

module.exports = db;
