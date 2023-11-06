const mongoose = require("mongoose");

const carrotSchema = mongoose.Schema({});

const Carrot = mongoose.model("Carrot", carrotSchema);

module.exports = Carrot;
