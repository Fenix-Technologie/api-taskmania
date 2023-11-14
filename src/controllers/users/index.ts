const auth = require("../../middleware/auth");

const createUser = require("./createUser");

import express from 'express'
import 'dotenv/config'
import { check } from 'express-validator'
import { getUserByEmail } from './getUserWithEmail';
import { getUserWithToken } from './getUserWithToken';

export const router = express.Router();

router.post(
  "/",
  [
    check("name", "O nome é obrigatório").not().isEmpty(),
    check("email", "Inclua um e-mail válido").isEmail(),
    check("password", "Digite uma senha com 6 ou mais caracteres").isLength({
      min: 6,
    }),
  ],
  createUser
);
router.get("/:token", getUserWithToken)

router.get("/:input", auth, getUserByEmail);


module.exports = router;
