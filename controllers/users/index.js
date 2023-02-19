const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const createUser = require("./create");
const getUserByEmail = require("./getUserWithEmail");

// Register user
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

// Get users by email regex
router.get("/:input", auth, getUserByEmail);

module.exports = router;
