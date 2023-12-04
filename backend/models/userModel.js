const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  carrots: { type: Number },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
