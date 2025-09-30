import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();

    // Dispara webhook si está registrado
    if (req.webhookUrl) {
      fetch(req.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedTask),
      }).catch((err) =>
        console.error("❌ Error enviando al webhook:", err.message)
      );
    }

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🚀 DELETE ALL tasks
router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "✅ All tasks deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
