const {
  addOperation,
  getOperations,
} = require("../models/operations.model.js");
const { updateAccountAmount, getAccountByID } = require('../models/accounts.model.js');

const createOperation = async (req, res) => {
  const param_profile_id = req.params;
  let { account_id_from, account_id_to, type, amount, username_from, username_to } = req.body;

  try {
    const account_from = await getAccountByID(account_id_from);
    const account_to = await getAccountByID(account_id_to);

    console.log('operations.controller accounts from/to ', account_from, account_to, req.body);

    // if (profile_id != param_profile_id) {
    //   return res.status(403).json({ error: 'operation forbidden' });
    // }

    const from_amount = parseFloat(account_from[0].amount);
    const to_amount = parseFloat(account_from[0].amount);
    amount = parseFloat(amount);

    if(from_amount + amount < 0){
      return res.status(409).json({ error: 'wrong params' });
    }

    const date = new Date().toISOString();
    const addedOperation = await addOperation(
      date,
      account_id_from,
      account_id_to,
      type,
      amount,
      username_from,
      username_to
    );

    const updatedAmount_from = await updateAccountAmount(account_id_from, from_amount - amount);
    const updatedAmount_to = await updateAccountAmount(account_id_to, to_amount + amount);

    if (addedOperation.length > 0 && updatedAmount_from.length > 0 && updatedAmount_to.length > 0){
      return res.status(200).json({ message: "Operation is created" });
    }else{
      return res.status(500).json({ error: "Something went wrong" });
    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllOperations = async (req, res) => {
  const { profile_id } = req.params;
  const { limit } = req.body;

  try {
    const operationsInfo = await getOperations(profile_id, limit);

    return res.status(200).json(operationsInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createOperation, getAllOperations };
