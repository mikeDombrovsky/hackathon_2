const bcrypt = require("bcrypt");
const { getUser, addUser } = require("../models/auth.model.js");

const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const responds = await getUser(username);
  if (responds.length > 0)
    return res.status(404).send("Username already exists");

  let newUser;

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) return res.status(404).send("Something go wrong");

    newUser = {
      username,
      password: hash,
    };
    const resp = await addUser(newUser.username, newUser.password);
    res.status(200).send(resp);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  fs.readFile(dataOfUsers, "utf-8", (err, data) => {
    if (err) return res.status(404).json({ error: "Something go wrong" });

    const users = JSON.parse(data);
    const existUser = users.find((user) => user.username === username);

    if (!existUser)
      return res.status(404).json({ message: "Username is not registered!" });

    bcrypt.compare(password, existUser.password, (err, result) => {
      if (err) return res.status(404).json({ error: "Something go wrong" });

      if (result) {
        res.send({ message: `Hi ${username}, welcome back again!` });
      } else {
        res.status(404).send({ message: "Invalid password" });
      }
    });
  });
};

module.exports = { register, login };
