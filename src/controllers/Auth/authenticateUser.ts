const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/User");

import { Request, Response } from 'express'

export const authenticateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Usuario inválido" }],
      });
    }

    // Check for email and password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "Senha incorreta" }],
      });
    }

    // Return jsonwebtoken
    jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err: Error, token: string) => {
        if (err) throw err;
        res.json({
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
