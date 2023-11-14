require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");

const createUser = require("./createUser");
const getUserByEmail = require("./getUserWithEmail");
const getUserWithToken = require("./getUserWithToken");

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
