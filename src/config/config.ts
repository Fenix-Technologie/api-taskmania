//const mongoose = require("mongoose");
import mongoose from 'mongoose'

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Banco de Dados MongoDB Connectado...");
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
  console.log("Conectado");
};
