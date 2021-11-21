const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.database.URI)
  .then(() => console.log("DB conneted"))
  .catch((e) => console.log(e));
