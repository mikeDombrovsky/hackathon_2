const { db } = require("../config/db.js");

const addProfile = (username) => {
  return db("profiles")
    .insert({ username })
    .returning(["profile_id", "username"]);
};

module.exports = { addProfile };
