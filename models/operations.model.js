const { db } = require("../config/db.js");

const addOperation = (date, account_id_from, account_id_to, type, amount) => {
  return db("operations")
    .insert({ date, account_id_from, account_id_to, type, amount })
    .returning([
      "operation_id",
      "date",
      "account_id_from",
      "account_id_to",
      "type",
      "amount",
    ]);
};

const getOperations = (profile_id) => {
  console.log(profile_id, "profile_id");
  return db("users")
    .join("profiles", "users.id", "=", "profiles.profile_id")
    .join("accounts", "accounts.profile_id", "=", "profiles.profile_id")
    .join(
      "operations",
      "operations.account_id_from",
      "=",
      "accounts.account_id"
    )
    .select(
      "operations.date",
      "operations.type",
      "operations.amount",
      "operations.account_id_to"
    )
    .where("accounts.profile_id", profile_id);
};

module.exports = { addOperation, getOperations };
