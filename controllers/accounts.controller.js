const { addAccount, removeAccount } = require("../models/accounts.model.js");

const createAccount = async (req, res) => {
  const { profile_id, type, amount } = req.body;
  console.log(profile_id, type, amount);
  try {
    const resp = await addAccount(Number(profile_id), type, Number(amount));
    console.log(resp);
    return res.status(200).json({ message: "Account is created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteAccount = async (req, res) => {
  const { account_id } = req.body;
  console.log(req.body);
  console.log(account_id);
  try {
    const resp = await removeAccount(account_id);
    console.log(resp);
    return res.status(200).json({ message: "Account is deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createAccount, deleteAccount };
