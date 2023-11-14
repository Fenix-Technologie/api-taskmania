const GetUserById = require("../../models/User/GetUserById");

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const getUserWithToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
      if (err) return res.status(401).send({ error: 'Token invalido' })

      req.body.userId = decoded.user.id
    })

    const user = await GetUserById(req.params);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no Servidor");
  }
};
