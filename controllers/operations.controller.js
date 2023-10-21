const {
  addOperation,
  getOperations,
} = require("../models/operations.model.js");

const createOperation = async (req, res) => {
  const { account_id_from, account_id_to, type, amount } = req.body;
  try {
    const date = new Date().toISOString();
    const addedOperation = await addOperation(
      date,
      account_id_from,
      account_id_to,
      type,
      amount
    );
    return res.status(200).json({ message: "Operation is created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllOperations = async (req, res) => {
  const { profile_id } = req.params;
  console.log(req.params, "req params");
  console.log(profile_id, "profile_id");
  try {
    const operationsInfo = await getOperations(profile_id);
    console.log(operationsInfo);
    return res.status(200).json(operationsInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createOperation, getAllOperations };
