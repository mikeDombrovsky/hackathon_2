const express = require("express");
const router = require("./routers/auth.route.js");
const app = express();

app.use(express.json());
app.use("/bank/auth", router);
app.listen(3000, () => {
  console.log("Server is running");
});
