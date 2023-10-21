const express = require("express");
const operationsRouter = express.Router();

const {
  createOperation,
  getAllOperations,
} = require("../controllers/operations.controller.js");

operationsRouter.post("/add", createOperation);

operationsRouter.get("/all/:profile_id", getAllOperations);

module.exports = { operationsRouter };
