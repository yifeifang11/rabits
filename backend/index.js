const express = require("express");
const mongoose = require("mongoose");
const carrotsRoute = require("./routes/carrotsRoute");
const habitsRoute = require("./routes/habitsRoute");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("chungus");
});

app.use("/habits", habitsRoute);
app.use("/carrots", carrotsRoute);
app.use("/auth", userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () =>
      console.log(`Listening to port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
