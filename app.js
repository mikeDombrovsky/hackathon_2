const express = require("express");
const cors = require("cors");
const { authRouter } = require("./routers/auth.route.js");
const { accountsRouter } = require("./routers/accounts.route.js");
const { operationsRouter } = require("./routers/operations.route.js");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/bank/auth", authRouter);
app.use("/bank/accounts", accountsRouter);
app.use("/bank/operations", operationsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
