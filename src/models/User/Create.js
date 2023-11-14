const User = require(".");

const Create = async (name, email, avatar, password) => {
  const user = new User({
    name,
    email,
    avatar,
    password,
  });

  await user.save();

  return user
};

module.exports = Create;
