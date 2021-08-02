// import express
const express = require("express");
const app = express();

// set PORT
const PORT = process.env.PORT || 5000;

// import cors
const cors = require("cors");

// import dotenv
require("dotenv").config();

// import files here
const toDosRouter = require("./routes/toDosRouter");

// settings (app.use())
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// routes files
app.use("/", toDosRouter);

// mongoose - DataBase setup
const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.MONGO_LINK + DB_NAME;

mongoose
  .connect(DB_LINK, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose found his way to the Databse..");
  })
  .catch((err) => {
    console.log("Mongoose connection failed!", err);
  });

// Listening PORT part
app.listen(PORT, () => {
  `App is listening on PORT : ${PORT} `;
});
