const { db } = require("../config/db.js");

const addOperation = (
  date,
  account_id_from,
  account_id_to,
  type,
  amount,
  username_from,
  username_to
) => {
  
  return db("operations")
    .insert({ date, account_id_from, account_id_to, type, amount, username_from, username_to })
    .returning([
      "operation_id",
      "date",
      "account_id_from",
      "account_id_to",
      "type",
      "amount",
      "username_from",
      "username_to",
    ]);
};

const getOperations = (profile_id, limit) => {
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
      "operations.username_to",
      "operations.username_from"
    )
    .where("operations.account_id_from", profile_id)
    .orWhere("operations.account_id_to", profile_id)
    .limit(limit)
    .orderBy("operations.date", "desc");
};

module.exports = { addOperation, getOperations };
