const User = require("./Schema");

const Create = async (name, email, avatar, password) => {
  const user = new User({
    name,
    email,
    avatar,
    password,
  });

  user.save();
};

module.exports = Create;
