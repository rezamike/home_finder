const express = require("express");
const PORT = process.env.PORT || 5050;
const app = express();
const mongoose = require("mongoose");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();
require("./controllers/index.js")(app);

mongoose.connect(process.env.ATLAS_URI);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
