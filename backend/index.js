const express = require("express");
const { PORT, mongoDBURL } = require("./config");
const mongoose = require("mongoose");
const carrotsRoute = require("./routes/carrotsRoute");
const habitsRoute = require("./routes/habitsRoute");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("chungus");
});

app.use("/habits", habitsRoute);
app.use("/carrots", carrotsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
