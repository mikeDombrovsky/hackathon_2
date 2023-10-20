const express = require("express");
const accountsRouter = express.Router();

const {
  createAccount,
  deleteAccount,
  getAllAccounts,
} = require("../controllers/accounts.controller.js");

accountsRouter.post("/add", createAccount);
accountsRouter.delete("/delete", deleteAccount);
accountsRouter.get("/all/:profile_id", getAllAccounts);

module.exports = { accountsRouter };
