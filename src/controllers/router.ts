//const users = require("./users");
// const auth = require("./Auth");
const boards = require("./boards");
const lists = require("./lists");
const cards = require("./cards");
const checklists = require("./checklists");

import { router as users } from './users'
import { router as auth } from './Auth'

import express from 'express'

export const router = express.Router();

router
  .use("/users", users)
  .use("/auth", auth)
// .use("/boards", boards)
// .use("/lists", lists)
// .use("/cards", cards)
// .use("/checklists", checklists);
