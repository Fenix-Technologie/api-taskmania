const Create = require("../../models/User/Create");

import 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { z } from 'zod'
import { Request, Response } from 'express'
import { getUserByEmail } from './getUserWithEmail';

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    avatar: z.string()
  })

  const { name, password, avatar } = userSchema.parse(req.body)

  let email: any

  try {
    // See if user exists
    if (email) {
      await getUserByEmail(email)
      return Response.json({ errors: [{ msg: "Usuário já existe" }] });
    }
    const cryptPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    // Register new user
    const user = await Create(name, email, avatar, cryptPassword);

    // Return jsonwebtoken
    jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        Response.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          token
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no Servidor");
  }
};

module.exports = createUser;
