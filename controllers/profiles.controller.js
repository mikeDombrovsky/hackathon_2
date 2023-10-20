const { addProfile } = require("../models/profiles.model.js");

const createProfile = async (req, res) => {
  const { username } = req.body;
  const responds = await addProfile(username);
  if (responds.length == 0) {
    return res.status(500).json({ error: "Something went wrong" });
  }
  return res.status(200).send(responds);
};

module.exports = { createProfile };
