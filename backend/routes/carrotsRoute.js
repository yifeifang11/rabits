const express = require("express");
const Carrot = require("../models/carrotModel");

const router = express.Router();

//post carrot
router.post("/", async (req, res) => {
  try {
    const newCarrot = {};
    const carrot = await Carrot.create(newCarrot);
    return res.status(201).send(carrot);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//get all carrots
router.get("/", async (req, res) => {
  try {
    const carrots = await Carrot.find({});
    return res.status(200).json({
      count: carrots.length,
      carrots: carrots,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//delete carrot
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Carrot.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "No carrots" });
    }

    return res.status(200).json({ message: "Carrot removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//delete all carrots
router.delete("/", async (req, res) => {
  try {
    await Carrot.deleteMany({});

    return res.status(200).json({ message: "Carrots all removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
