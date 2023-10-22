const {
  addAccount,
  removeAccount,
  getAccountsByProfileID,
  getAccountByID,
} = require("../models/accounts.model.js");

const createAccount = async (req, res) => {
  const { profile_id, type, amount } = req.body;

  try {
    const resp = await addAccount(Number(profile_id), type, Number(amount));

    return res.status(200).json({ message: "Account is created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteAccount = async (req, res) => {
  const { account_id } = req.body;

  try {
    const resp = await removeAccount(account_id);

    return res.status(200).json({ message: "Account is deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllAccounts = async (req, res) => {
  const { profile_id } = req.params;

  try {
    const accountsInfo = await getAccountsByProfileID(profile_id);
    return res.status(200).json(accountsInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAccountByAccountId = async (req, res) => {
  const { account_id } = req.params;

  try {
    const accountInfo = await getAccountByID(account_id);
    return res.status(200).json(accountInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createAccount, deleteAccount, getAllAccounts, getAccountByAccountId };
