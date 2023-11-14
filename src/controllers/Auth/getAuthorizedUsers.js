const FindById = require("../../models/User/FindById");

const getAuthorizedUsers = async (req, res) => {
  try {
    const { user: bodyUser } = req.body;
    const user = await FindById(bodyUser.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = getAuthorizedUsers;
