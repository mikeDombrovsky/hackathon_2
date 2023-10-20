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

const getAccountsByProfileID = (profile_id) => {
  console.log(profile_id, "profile_id");
  return db("users")
    .join("profiles", "users.id", "=", "profiles.profile_id")
    .join("accounts", "accounts.profile_id", "=", "profiles.profile_id")
    .select(
      "accounts.type",
      "accounts.amount",
      "accounts.profile_id",
      "users.id"
    )
    .where("accounts.profile_id", profile_id);
};

module.exports = { addAccount, removeAccount, getAccountsByProfileID };
