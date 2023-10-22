const express = require("express");
const operationsRouter = express.Router();

const {
  createOperation,
  getAllOperations,
} = require("../controllers/operations.controller.js");

operationsRouter.post("/add/:profile_id", createOperation);

operationsRouter.post("/all/:profile_id", getAllOperations);

module.exports = { operationsRouter };
