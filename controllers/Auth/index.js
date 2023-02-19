const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { check } = require("express-validator");
require("dotenv").config();

const getAuthorizedUsers = require("./getAuthorizedUsers");
const authenticateUser = require("./authenticateUser");

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

module.exports = router;
