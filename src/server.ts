import express from 'express'
import cors from 'cors'
import { router } from './controllers/router';
import { db } from './config/config';
import 'dotenv/config'

const app = express();

// Conexão Banco de Dados
db();

app.use(cors());

// Init middleware
app.use(express.json({ strict: false }));

app.use("/api", router);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3333;

app.set('port', PORT);

app.listen(PORT, () => console.log("Servidor Iniciado na Porta " + PORT));
