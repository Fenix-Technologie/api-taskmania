const getUserByEmail = async (req, res) => {
  try {
    const formatedEmail = new RegExp(req.params.input, "i");
    const user = await getUserByEmail(formatedEmail);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
  }
};

module.exports = getUserByEmail;
