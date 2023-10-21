const {
  addAccount,
  removeAccount,
  getAccountsByProfileID,
} = require("../models/accounts.model.js");

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

const getAllAccounts = async (req, res) => {
  const { profile_id } = req.params;
  console.log(req.params, "req params");
  console.log(profile_id, "profile_id");
  try {
    const accountsInfo = await getAccountsByProfileID(profile_id);
    console.log(accountsInfo);
    return res.status(200).json(accountsInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createAccount, deleteAccount, getAllAccounts };
