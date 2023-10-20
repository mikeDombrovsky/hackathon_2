const express = require("express");
const accountsRouter = express.Router();

const {
  createAccount,
  deleteAccount,
} = require("../controllers/accounts.controller.js");

accountsRouter.post("/add", createAccount);
accountsRouter.delete("/delete", deleteAccount);

module.exports = { accountsRouter };
