const express = require("express");
const Carrot = require("../models/carrotModel");
const User = require("../models/userModel");

const router = express.Router();

//post carrot
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    user.carrots = user.carrots + 1;
    user.save();
    return res.status(201).json({ carrots: user.carrots });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//get all carrots
router.put("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    return res.status(200).json({
      count: user.carrots,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//delete all carrots
router.delete("/:userID", async (req, res) => {
  try {
    await Carrot.deleteMany({ user: req.params.userID });
    const user = await User.findById(req.params.userID);
    user.carrots = 0;
    user.save();
    return res.status(200).json({ message: "Carrots all removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
