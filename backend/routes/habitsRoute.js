const express = require("express");
const Habit = require("../models/habitModel");

const router = express.Router();

//post habit
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.goal) {
      return res.status(400).send({
        message: "Please add a name and goal",
      });
    }
    const newHabit = {
      name: req.body.name,
      description: req.body.description ? req.body.description : "",
      count: 0,
      goal: req.body.goal,
    };
    const habit = await Habit.create(newHabit);
    return res.status(201).send(habit);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//get all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find({});
    return res.status(200).json({
      count: habits.length,
      habits: habits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//get one habit by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    return res.status(200).json(habit);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//update habit
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.goal) {
      return res.status(400).send({
        message: "Please add a name and goal",
      });
    }

    const { id } = req.params;

    const result = await Habit.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Habit not found" });
    }
    return res.status(200).json({ message: "Habit updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//complete habit
router.put("/carrot/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    var count = habit.count;
    count++;

    const result = await Habit.findByIdAndUpdate(id, {
      count: count,
    });

    if (!result) {
      return res.status(404).json({ message: "Habit not found" });
    }
    return res.status(200).json({ message: "Habit updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Habit.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Habit not found" });
    }

    return res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
