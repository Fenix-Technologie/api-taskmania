const FindById = require("../../models/User/FindById");
import { Request, Response } from 'express'

export const getAuthorizedUsers = async (req: Request, res: Response) => {
  try {
    const { user: bodyUser } = req.body;
    const user = await FindById(bodyUser.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
