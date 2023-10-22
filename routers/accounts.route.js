const express = require("express");
const accountsRouter = express.Router();

const {
  createAccount,
  deleteAccount,
  getAllAccounts,
  getAccountByAccountId
} = require("../controllers/accounts.controller.js");

accountsRouter.post("/add", createAccount);
accountsRouter.delete("/delete", deleteAccount);
accountsRouter.get("/all/:profile_id", getAllAccounts);
accountsRouter.get("/:account_id", getAccountByAccountId);

module.exports = { accountsRouter };
