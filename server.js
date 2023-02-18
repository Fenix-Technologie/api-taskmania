const express = require("express");
const db = require("./config/config");
require("dotenv").config();
const cors = require("cors");
const router = require("./controllers/router");

const app = express();

// Conexão Banco de Dados
db();

app.use(cors());

// Init middleware
app.use(express.json({ extended: false }));

app.use("/api", router);

const PORT = process.env.PORT || 3333;

app.set('port', PORT);

app.listen(PORT, () => console.log("Servidor Iniciado na Porta " + PORT));
