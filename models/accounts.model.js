const { db } = require("../config/db.js");

const addAccount = (profile_id, type, amount) => {
  return db("accounts")
    .insert({ profile_id, type, amount })
    .returning(["account_id", "profile_id", "type", "amount"]);
};

const removeAccount = (account_id) => {
  return db("accounts")
    .del({ account_id })
    .where("account_id", account_id)
    .returning(["account_id", "profile_id", "type", "amount"]);
};

module.exports = { addAccount, removeAccount };
