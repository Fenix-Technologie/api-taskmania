import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { z } from 'zod';

let res: Response

export const getUserByEmail = async (req: Request) => {

  const userEmail = z.object({
    email: z.string().email()
  })

  //const { email } = userEmail.parse(req.params.input)
  let email: any

  try {
    const formatedEmail = new RegExp(req.params.input, "i");
    const user = await getUserByEmail(email);

    Response.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no Servidor");
  }
};


