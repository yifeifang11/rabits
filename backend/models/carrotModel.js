const mongoose = require("mongoose");

const carrotSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Carrot = mongoose.model("Carrot", carrotSchema);

module.exports = Carrot;
