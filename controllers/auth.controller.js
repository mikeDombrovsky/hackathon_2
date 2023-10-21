const bcrypt = require("bcrypt");
const { getUser, addUser } = require("../models/auth.model.js");
const { addProfile } = require("../models/profiles.model.js");
const { addAccount } = require("../models/accounts.model.js");

const register = async (req, res) => {
  const { username, password } = req.body;

  const responds = await getUser(username);
  if (responds.length > 0)
    return res.status(409).json({ error: "Username already exists" });

  let newUser;

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) return res.status(500).json({ error: "Something went wrong" });

    newUser = {
      username,
      password: hash,
    };

    if (hash) {
      const resp = await addUser(newUser.username, newUser.password);
      const resp2 = await addProfile(newUser.username);
      let resp3;
      if (resp2[0].profile_id) {
        resp3 = await addAccount(resp2[0].profile_id, "USD", 0);
      }

      if (resp.length > 0 && resp2.length > 0 && resp3.length > 0) {
        res.send({ message: `Successfully registered!`, id: resp[0].id });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } else {
      res.status(404).json({ error: "Username already exists" });
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const responds = await getUser(username);
  if (responds.length == 0)
    return res.status(404).json({ error: "User not found" });
  const user = responds[0];

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(500).json({ error: "Something went wrong" });

    if (result) {
      res.send({ message: `Hi ${username}, welcome back again!`, id: user.id });
    } else {
      res.status(404).json({ error: "Invalid credentials" });
    }
  });
};

module.exports = { register, login };
