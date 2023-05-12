const GetUserById = require("../../models/User/GetUserById");
const jwt = require("jsonwebtoken");

const getUserWithToken = async (req, res) => {
  try {
    const { token } = req.params

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token invalido' })

      req.userId = decoded.user.id
    })

    const user = await GetUserById(req.userId);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
};

module.exports = getUserWithToken;
