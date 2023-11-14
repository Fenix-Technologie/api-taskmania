
const auth = require("../../middleware/auth");
import express from 'express'
import 'dotenv/config'
import { check } from 'express-validator'
import { authenticateUser } from './authenticateUser';
import { getAuthorizedUsers } from './getAuthorizedUsers';

export const router = express.Router();

// Get authorized user
router.get("/", auth, getAuthorizedUsers);

// Authenticate user & get token
router.post(
  "/",
  [
    check("email", "O e-mail é obrigatório").isEmail(),
    check("password", "Senha obrigatória").exists(),
  ],
  authenticateUser
);

