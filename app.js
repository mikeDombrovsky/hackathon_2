const express = require("express");
const cors = require('cors');
const router = require("./routers/auth.route.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/bank/auth", router);

app.listen(3000, () => {
  console.log("Server is running");
});
