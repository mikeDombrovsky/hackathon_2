const bcrypt = require("bcrypt");
const { getUser, addUser } = require("../models/auth.model.js");

const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const responds = await getUser(username);
  if (responds.length > 0)
    return res.status(409).json({ error: "Username already exists" });

  let newUser;

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) return res.status(500).json({ error: "Something go wrong" });

    newUser = {
      username,
      password: hash,
    };
    const resp = await addUser(newUser.username, newUser.password);
    res.status(200).json(resp);
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const responds = await getUser(username);
  if (responds.length == 0)
    return res.status(404).json({ error: "User not found" });
  const user = responds[0];

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(500).json({ error: "Something go wrong" });

    if (result) {
      res.send({ message: `Hi ${username}, welcome back again!` });
    } else {
      res.status(404).json({ error: "Invalid password" });
    }
  });
};

module.exports = { register, login };
